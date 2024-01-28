export interface ZohoTokenRepository {
  getZohoAcessToken(): Promise<string>;
  createAccessToken(token: string, expiresIn: number): Promise<void>;
}
