import { Injectable } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';

import { user } from '@seniorsistemas/senior-platform-data';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  usuario: any;
  public vp: VP_BPM = new VP_BPM();
  private capturaAcao = new Subject<string>();
  acao$ = this.capturaAcao.asObservable();
  constructor() {
    user
      .getToken()
      .then((retorno) => {
        this.capturaAcao.next(retorno);
      })
      .catch((error) => {
        alert(
          'Não foi possível obter token. Verifique se a tela está sendo acessada pela plataforma Senior X.'
        );
      });
  }

  async getUserToken() {
    const axios = require('axios');
    let data = JSON.stringify({
      username: 'hcm.gestor@ipasgo.go.gov.br',
      password: '@98fm12',
      escopo: 'string',
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/authentication/actions/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    try {
      const response = await axios.request(config);
      console.log(response.data.jsonToken);

      return response.data.jsonToken;
    } catch (error: any) {
      console.error(error);
      return error;
    }
  }

  async getPospos(username: string, userToken: string) {
    console.log(username);
    console.log(userToken);

    const axios = require('axios');

    let data = JSON.stringify({
      username: username,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://ipasgo.prismainformatica.com.br:8181/SXI-API/G5Rest?useAlwaysArray=true&server=https://ipasgo.prismainformatica.com.br:8181&port=usuario_pospos&module=rubi&service=prisma_bi',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
      data: data,
    };

    try {

      const response = await axios.request(config);
      console.log(response.data);

      return {
        data: response.data,
        status: 1,
      };
    } catch (error: any) {
      console.error(error);
      return {
        data: null,
        status: 0,
      };
    }
  }
}
