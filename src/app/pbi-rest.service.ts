import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IPublicClientApplication,
  PublicClientApplication,
  Configuration,
  AuthenticationResult,
} from '@azure/msal-browser';

@Injectable({
  providedIn: 'root',
})
export class PBIRESTService {
  constructor() {}
  async getAuthToken() {
    
  }
  async getEmbedToken(authToken: string) {
    const axios = require('axios');
    let data = JSON.stringify({
      datasets: [
        {
          id: '8b009ae6-2871-41d2-9652-b6e6ba94f4e6',
        },
      ],
      reports: [
        {
          id: 'fa000586-a94a-4c01-a916-3577dcffe835',
        },
      ],
      accessLevel: 'View',
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.powerbi.com/v1.0/myorg/GenerateToken',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' + authToken,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      console.error(error);
      return error;
    }
  }
}
