import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http : HttpClient) {}

  private readonly clientId = 'xgcflybwi631ysk';
  private readonly clientSecret = 'm8r0uwfog9ikgoe';
  private readonly REFRESH_TOKEN = 'KlFDU2Mq76AAAAAAAAAAAQHvVuszNnzz10IYhaa-_AH6nXXwnSB4FtPByH1BbG8R';

  async refreshToken(accessToken: string): Promise<string | null> {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    const apiUrl = 'https://api.dropboxapi.com/oauth2/token';

    const authHeader = 'Basic ' + btoa(clientId + ':' + clientSecret);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authHeader,
    });

    const body = new HttpParams()
      .set('code', accessToken)
      .set('grant_type', 'authorization_code');

    const requestOptions = { headers };

    try {
      const response: any = await this.http.post(
        apiUrl,
        body.toString(),
        requestOptions
      ).toPromise();

      if (response && response.access_token) {
        return response.access_token;
      }

      return null;
    } catch (error) {
      console.error('Error refreshing Dropbox token:', error);
      return null;
    }
}


   getAccessToken() : any {
    // this.refreshToken('JA9eY2Qc2i8AAAAAAAAAH3y7ynt8QkNlo9OKZwniXKI');
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    const refreshToken = this.REFRESH_TOKEN;

    return axios({
      method: 'post',
      url: 'https://api.dropbox.com/oauth2/token',
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      },
    })
      .then( (response) => {
        const accessToken = response.data.access_token;
        console.log(`Access token: ${accessToken}`);
        return accessToken;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  
}
