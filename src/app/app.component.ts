import { Component, ViewChild } from '@angular/core';
import { MenuItem, PrimeNGConfig, MessageService } from 'primeng/api';
import { VP_BPM } from 'src/beans/VP_BPM';
// import formValidate from 'src/functions/Form_Validate';
import { Validate_Service } from '../services/Validate_Service';

import axios from 'axios';

import { Messages } from 'primeng/messages';
import * as models from 'powerbi-models';
import { AppService } from './app.service';
import { AzureManagementService } from './azure-management.service';
import { PBIRESTService } from './pbi-rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, Validate_Service],
})
export class AppComponent {
  public title = 'EmbeddedPBI';
  retorno: any;
  userToken: string = '';
  posPos: string = '';
  username: string = '';
  capacityAccessToken: string = '';
  authAccessToken: string = '';

  checked: boolean = false;

  public vp: VP_BPM = new VP_BPM();
  constructor(
    private appService: AppService,
    private messageService: MessageService,
    private azureManagementService: AzureManagementService,
    private pbirestService: PBIRESTService
  ) {
    this.appService.acao$.subscribe((retorno: any) => {
      this.retorno = retorno;
      // console.log(this.retorno);

      this.checkCapacity();
    });
  }

  async checkCapacity() {
    //requisição para pegar o token
    this.capacityAccessToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hZGE4MmE2ZC05ZjVlLTQyMzEtYmMwYi1kODMyYmMzMGExYTYvIiwiaWF0IjoxNzM0NjM1OTgzLCJuYmYiOjE3MzQ2MzU5ODMsImV4cCI6MTczNDYzOTg4MywiYWlvIjoiazJCZ1lQZzBRYmZzbVV4d0syK2loMEdYMmtrVEFBPT0iLCJhcHBpZCI6IjViYzY5MDQ3LWJlNzUtNGI4Ni1iY2RmLTNlYmYwNjJiN2ZkYiIsImFwcGlkYWNyIjoiMSIsImdyb3VwcyI6WyI3Y2M2YzNkMC0wZTQxLTQ0OGUtYmFjMy1kODIzN2QzNTVmN2EiXSwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYWRhODJhNmQtOWY1ZS00MjMxLWJjMGItZDgzMmJjMzBhMWE2LyIsImlkdHlwIjoiYXBwIiwib2lkIjoiYThiYmIwYzYtY2E3OC00Mjk2LTg1YzktOTI5ZjFkZDNiZTRlIiwicmgiOiIxLkFVVUFiU3FvclY2Zk1VSzhDOWd5dkRDaHBrWklmM2tBdXRkUHVrUGF3ZmoyTUJORkFBQkZBQS4iLCJzdWIiOiJhOGJiYjBjNi1jYTc4LTQyOTYtODVjOS05MjlmMWRkM2JlNGUiLCJ0aWQiOiJhZGE4MmE2ZC05ZjVlLTQyMzEtYmMwYi1kODMyYmMzMGExYTYiLCJ1dGkiOiI1TUNfZm9FY04wMmdOVWIxMk5hcUFBIiwidmVyIjoiMS4wIiwieG1zX2lkcmVsIjoiNyAxMCIsInhtc190Y2R0IjoxNTc2MTg5OTk1fQ.BoUfun1vfd9LC-vUg_4ikRURAvGMWVPmx9JcGKZG-c6OXXlHXtt1zR7fqiptvmFpaTza2U9ea56iQyHsHiltVsNvUejhM9ZxYpZYHYa-OO-N-a3EU3ReyAKETJeo9jErHP_GxxdAbv6xb7OPJ4qN_-6Pr_Qji8LCv9Q6IoGNQixOT5A09zDh1nh1P-TGnaWs2wegvc5ZBbXnFffnv0G91L5KaW_aeOKBltcSqUEX8RmuFSsSrPkewoqjtAQYJftXEKm2ki4kjx6sDQEtJM9NQi5cXjULL3DixczNF1rMYHr6BRvzGGkFbBW3mv98iGZwtMyu-qKJX-1yfUVG1qiVug';

    let status: any = await this.azureManagementService.statusCapacity(
      this.capacityAccessToken
    );
    console.log(status);
    if (status == 'Paused') {
      let resume: any = await this.azureManagementService.resumeCapacity(
        this.capacityAccessToken
      );
      console.log(resume);
      if (resume == 202) {
        console.log('Capacidade ligada com sucesso');
        this.embeddedToken();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao ligar capacidade',
        });
      }
    } else {
      this.embeddedToken();
    }
  }

  async embeddedToken() {
    //token de autenticação
    this.authAccessToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYWRhODJhNmQtOWY1ZS00MjMxLWJjMGItZDgzMmJjMzBhMWE2LyIsImlhdCI6MTczNDYzNTk1NiwibmJmIjoxNzM0NjM1OTU2LCJleHAiOjE3MzQ2Mzk4NTYsImFpbyI6ImsyQmdZQWphOGtQdHVYZU9zS1h5cm1mYlF0Uy9BUUE9IiwiYXBwaWQiOiI1YmM2OTA0Ny1iZTc1LTRiODYtYmNkZi0zZWJmMDYyYjdmZGIiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hZGE4MmE2ZC05ZjVlLTQyMzEtYmMwYi1kODMyYmMzMGExYTYvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiJhOGJiYjBjNi1jYTc4LTQyOTYtODVjOS05MjlmMWRkM2JlNGUiLCJyaCI6IjEuQVVVQWJTcW9yVjZmTVVLOEM5Z3l2RENocGdrQUFBQUFBQUFBd0FBQUFBQUFBQUJGQUFCRkFBLiIsInN1YiI6ImE4YmJiMGM2LWNhNzgtNDI5Ni04NWM5LTkyOWYxZGQzYmU0ZSIsInRpZCI6ImFkYTgyYTZkLTlmNWUtNDIzMS1iYzBiLWQ4MzJiYzMwYTFhNiIsInV0aSI6Imk0OFczYmp0bms2d2FTUEUyQlVOQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfaWRyZWwiOiI3IDI0In0.j3HNuU3qSI9E0EexM6IS9poVgMgg8xkJmSQNzA9Vh63h5xWpQhMxmKlWZUXfdaNzFKP1ZzdKP6nAldqrwwJ9FiiMLGg1o990aU4FmwhFIVLcGHWShn6jU2PbaQpZX-1EhOsGKzPo6LFAfVumg0iNVWuVxI7jMgg7O0HkQ2I_sDxSB2NT2koU3KHjgKd4OOTfCTSvK-lLM7qUs3jd7r98YXMWumcXHkAz7KWWgziFBilQxNZKdwOjWdzlryfjkuuCuSt9mwzsJ0SHaL50xmxg0s8cRPgHYpF8S0HqqIHrPt7oG0kbmbZaTsOa3Cb_bg5YWYavq4XCw8MGn8w2xnOOQQ';
    let response: any = await this.pbirestService.getEmbedToken(
      this.authAccessToken
    );
    this.vp.embedToken = response.token;
    console.log(this.vp.embedToken);

    this.autenticasUsuario();
    console.log(response);
  }

  async autenticasUsuario() {
    console.log(this.retorno);

    this.username = this.retorno.username;
    this.userToken = await this.appService.getUserToken()
    this.userToken  = this.userToken.toString().substring(174, 206)
    console.log(this.userToken);


    let response: any = await this.appService.getPospos(
      this.username,
      this.userToken
    );
    console.log(response);

    this.vp.posPos = '00020D0805';

    if (response.status == 1) {
      // if (response.data.posPos == '') {
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Erro',
      //     detail: response.data.retorno,
      //   });
      //   return;
      // }
      // this.posPos = response.data.posPos.replace(/['"]+/g, '');

      // console.log(this.posPos);
      this.vp.Buscando_WS = false;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao buscar dados do usuário',
      });
    }


  }

  public ngOnInit(): void {
    // this.vp.Buscando_WS = false;
  }
}
