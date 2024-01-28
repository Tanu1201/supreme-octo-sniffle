import { IZohoSignService } from 'src/domain/adapters/zohoSign.interface';

const authUrl = 'https://accounts.zoho.in/oauth/v2/token';
const baseUrl = 'https://sign.zoho.in/api/v1';

export class ZohoSignService implements IZohoSignService {
  async generateNewAccessToken(
    refreshToken: string,
    clientId: string,
    clientSecret: string,
  ): Promise<{
    token: string;
    expiresIn: number;
  }> {
    const response = await fetch(
      `${authUrl}?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`,
      {
        method: 'POST',
      },
    );
    const { access_token: token, expires_in: expiresIn } = await response.json();
    return {
      token,
      expiresIn,
    };
  }

  async createDocument(
    file: any,
    name: string,
    email: string,
    accessToken: string,
  ): Promise<{
    requestId: string;
    documentId: string;
  }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'data',
      JSON.stringify({
        requests: {
          request_name: 'Test',
          actions: [
            {
              recipient_name: name,
              recipient_email: email,
              action_type: 'SIGN',
              private_notes: 'Please get back to us for further queries',
              signing_order: 0,
              verify_recipient: false,
            },
          ],
          expiration_days: 1,
          is_sequential: true,
        },
      }),
    );

    const res = await fetch(`${baseUrl}/requests`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
      body: formData,
    });
    const {
      requests: {
        request_id: requestId,
        document_fields: [{ document_id: documentId }],
      },
    } = await res.json();

    return {
      requestId,
      documentId,
    };
  }

  async addSignTag(
    name: string,
    email: string,
    requestId: string,
    accessToken: string,
    documentId: string,
  ): Promise<{
    actionId: string;
  }> {
    var urlencoded = new URLSearchParams();
    urlencoded.append(
      'data',
      JSON.stringify({
        requests: {
          actions: [
            {
              verify_recipient: false,
              action_type: 'SIGN',
              private_notes: 'Please get back to us for further queries',
              verification_type: 'EMAIL',
              recipient_phonenumber: '',
              recipient_name: name,
              recipient_email: email,
              signing_order: 0,
              fields: {
                image_fields: [
                  {
                    document_id: documentId,
                    field_name: 'Signature',
                    abs_width: 22,
                    abs_height: 5,
                    is_mandatory: true,
                    x_coord: 6,
                    y_coord: 0,
                    page_no: 0,
                    field_type_name: 'Signature',
                  },
                ],
              },
              recipient_countrycode: '',
              deleted_fields: [],
            },
          ],
          deleted_actions: [],
          request_name: 'Test ',
        },
      }),
    );
    const res = await fetch(`${baseUrl}/requests/${requestId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlencoded,
    });
    const {
      requests: {
        actions: [{ action_id: actionId }],
      },
    } = await res.json();
    return {
      actionId,
    };
  }

  async sendDocumentForSign(
    name: string,
    email: string,
    requestId: string,
    documentId: string,
    actionId: string,
    accessToken: string,
  ): Promise<string> {
    var urlencoded = new URLSearchParams();
    urlencoded.append(
      'data',
      JSON.stringify({
        requests: {
          request_name: 'test',
          actions: [
            {
              recipient_name: name,
              recipient_email: email,
              in_person_name: name,
              action_type: 'SIGN',
              private_notes: 'Testing purpose',
              signing_order: 0,
              verify_recipient: false,
              verification_type: 'EMAIL',
              fields: [
                {
                  field_name: 'Signature',
                  field_label: 'Signature',
                  field_type_name: 'Signature',
                  document_id: documentId,
                  action_id: actionId,
                  is_mandatory: true,
                  x_coord: 6,
                  y_coord: 0,
                  abs_width: 22,
                  abs_height: 5,
                  page_no: 1,
                  default_value: 'sign here',
                  is_read_only: false,
                  name_format: 'FIRST_NAME',
                  date_format: 'MM/DD/YYYY',
                  description_tooltip: 'Sign here',
                },
              ],
            },
          ],
        },
      }),
    );
    await fetch(`${baseUrl}/requests/${requestId}/submit`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlencoded,
    });
    return 'Sent for sign';
  }
}
