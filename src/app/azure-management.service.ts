import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AzureManagementService {
  constructor() {}

  async getCapacityToken() {
    
  }

  async resumeCapacity(accessToken: string) {
    const axios = require('axios');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://management.azure.com/subscriptions/a1bd6da3-723e-44cc-8f27-2995140e20df/resourceGroups/PBEmbedded/providers/Microsoft.PowerBIDedicated/capacities/pbdashboards/resume?api-version=2021-01-01',
      headers: {
        Authorization:
          'Bearer ' + accessToken,
      },
    };
    try {
      const response = await axios.request(config);
      console.log(response.status);

      return response.status;
    } catch (error: any) {
      console.error(error);
      return error;
    }
  }

  async suspendCapacity(accessToken: string) {
    const axios = require('axios');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://management.azure.com/subscriptions/a1bd6da3-723e-44cc-8f27-2995140e20df/resourceGroups/PBEmbedded/providers/Microsoft.PowerBIDedicated/capacities/pbdashboards/suspend?api-version=2021-01-01',
      headers: {
        Authorization:
          'Bearer ' + accessToken,
      },
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

  async statusCapacity(accessToken: string) {
    const axios = require('axios');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://management.azure.com/subscriptions/a1bd6da3-723e-44cc-8f27-2995140e20df/resourceGroups/PBEmbedded/providers/Microsoft.PowerBIDedicated/capacities/pbdashboards?api-version=2021-01-01',
      headers: {
        Authorization:
          'Bearer ' + accessToken,
      },
    };
    try {
      const response = await axios.request(config);
      console.log(response.data);

      return response.data.properties.state;
    } catch (error: any) {
      console.error(error);
      return error;
    }
  }
}
