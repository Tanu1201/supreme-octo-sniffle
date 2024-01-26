import { PasswordTokenRepository } from 'src/domain/repositories/passwordTokenRepository.interface';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { IJwtService, IJwtServicePayload } from '../../domain/adapters/jwt.interface';
import { JWTConfig } from '../../domain/config/jwt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JWTConfig,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly passwordTokenRepository: PasswordTokenRepository,
  ) {}

  async getCookieWithJwtToken(email: string) {
    this.logger.log('LoginUseCases execute', `The user ${email} have been logged.`);
    const payload: IJwtServicePayload = { email: email };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  }

  async getCookieWithJwtRefreshToken(email: string) {
    this.logger.log('LoginUseCases execute', `The user ${email} have been logged.`);
    const payload: IJwtServicePayload = { email: email };
    const secret = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    await this.setCurrentRefreshToken(token, email);
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
    return cookie;
  }

  async validateUserForLocalStragtegy(email: string, pass: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const match = await this.bcryptService.compare(pass, user.password);
    if (user && match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserForJWTStragtegy(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }

  async setCurrentRefreshToken(refreshToken: string, email: string) {
    const currentHashedRefreshToken = await this.bcryptService.hash(refreshToken);
    await this.userRepository.updateRefreshToken(email, currentHashedRefreshToken);
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isRefreshTokenMatching = await this.bcryptService.compare(refreshToken, user.refreshToken);
    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }

  async setPassword(token: string, password: string) {
    const passwordToken = await this.passwordTokenRepository.getPasswordTokenById(token);
    console.log(passwordToken);
    if (!passwordToken) {
      return null;
    }
    if (new Date(passwordToken.expiresAt).getTime() < new Date().getTime()) {
      return null;
    }
    const user = await this.userRepository.getUserById(passwordToken.userId);
    console.log(user);
    if (!user) {
      return null;
    }
    const hashedPassword = await this.bcryptService.hash(password);
    await Promise.all([
      this.userRepository.updatePassword(user.id, hashedPassword),
      this.passwordTokenRepository.deletePasswordToken(token),
    ]);
    return user;
  }
}
