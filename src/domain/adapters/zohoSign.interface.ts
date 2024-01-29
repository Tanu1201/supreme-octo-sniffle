export interface IZohoSignService {
  createDocument(
    file: any,
    name: string,
    email: string,
    accessToken: string,
  ): Promise<{
    requestId: string;
    documentId: string;
    actionId: string;
  }>;
  addSignTag(
    name: string,
    email: string,
    requestId: string,
    accessToken: string,
    documentId: string,
  ): Promise<{
    actionId: string;
  }>;
  sendDocumentForSign(
    name: string,
    email: string,
    requestId: string,
    documentId: string,
    actionId: string,
    accessToken: string,
  ): Promise<string>;
  generateNewAccessToken(
    refreshToken: string,
    clientId: string,
    clientSecret: string,
  ): Promise<{
    token: string;
    expiresIn: number;
  }>;
}
