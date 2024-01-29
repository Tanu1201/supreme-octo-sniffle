import { ZohoConfig } from 'src/domain/config/zoho.interface';
import { UserM } from 'src/domain/model/user';
import { TransactionRepository } from 'src/domain/repositories/transactionRepository.interface';
import { ZohoTokenRepository } from 'src/domain/repositories/zohoTokenRepository.interface';
import { ZohoSignService } from 'src/infrastructure/services/zohoSign/zohoSign.service';

export class AddTransactionUseCases {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly zohoTokenRepository: ZohoTokenRepository,
    private readonly zohoSignService: ZohoSignService,
    private readonly zohoConfig: ZohoConfig,
  ) {}

  async execute(file: Express.Multer.File, groupId: string, user: UserM, name: string, email: string) {
    if (file.path.split('.').pop() !== 'pdf') {
      throw new Error('File must be a pdf!');
    }
    const transaction = await this.transactionRepository.createTransaction(file.path, groupId, user);
    let accessToken = await this.zohoTokenRepository.getZohoAcessToken();

    if (!accessToken) {
      const newToken = await this.zohoSignService.generateNewAccessToken(
        this.zohoConfig.getZohoRefreshToken(),
        this.zohoConfig.getZohoClientId(),
        this.zohoConfig.getZohoClientSecret(),
      );
      accessToken = newToken.token;

      await this.zohoTokenRepository.createAccessToken(accessToken, newToken.expiresIn);
    }

    const { requestId, documentId, actionId } = await this.zohoSignService.createDocument(file, name, email, accessToken);
    await this.zohoSignService.sendDocumentForSign(name, email, requestId, documentId, actionId, accessToken);
    return transaction;
  }
}
