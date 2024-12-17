import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { PowerBIService } from '../powerbi.service';
import * as models from 'powerbi-models';

@Component({
  selector: 'app-powerbi-report',
  templateUrl: './powerbi-report.component.html',
  styleUrls: ['./powerbi-report.component.scss'],
})
export class PowerbiReportComponent  {
  // Configuração do relatório Power BI
  embedConfig = {
    type: 'report', // Tipo do embed (relatório)
    id: 'fa000586-a94a-4c01-a916-3577dcffe835', // ID do relatório
    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=fa000586-a94a-4c01-a916-3577dcffe835', // URL de embed
    accessToken: 'H4sIAAAAAAAEACWUtw7rWBIF_-WlXIAUrbjABKL3oncZvbeXfrD_vsJMXkGjcKr__mMmdz8l-Z___tFF_N5DVmuRj4sr6EYUb87RArpJQznhBO5iBbra8_gMVrb33bliDSeexug-_TSOzG9MpO1XBgFXWRdBvaOGUNRZQzHRqHCveXSb_yS8BBQSy5ZqgxbyXTUnWAAKa6WRo5T1FOnXW3G6lDbjI_Ukxn6LTTsMKCiRt8vDp35eJYWTbdiFY93t1_ypZBFvIOJbb0Z5yynHa_jHcbJBy6F41-CSSSeof84oTt5gU77sW3hE5JFp_2W2X8wZijNCNMXOptIxQx6c1FlAhwljKk--gyTVKfs9JyvAYXTlpdFmN8BMdzQhKJJgA5AXvvQLZus6R_N6Ld5Wt7i7ecTDcdRkcDi8DZTWeIdJ2DzmrTR1alESwwiAcpqqxxhrZHnvBR-bt-yBxdkBIKFP7Hwvo-H5b0avYjQRM3KyQr-01unJygF3C7lYuDR6FKr1LVzuC-RnqkabE1I7LculT-0CP2kEG6u1BdumcJHrAcn39pWnjFZQGqNJgVha8pwME5MuiiTPRpyaV1Q1nhJXeA9FPGeHXgc5Dto2lr2yw8GGwCIJlmWEZ-pXMWB51ap2ybIdbFaJcz0-6z0L2DAndhOrnRw74UcZpihFFELc5fOT5OVmN5Fj7XnBdeRB0y7kV2keKwjzFuk9gmUciwJJrDr0eKviIKX9V3gB5oOvmPZBbtpzmHj3konEr_GN99GKyfoWPsr1LFcf6lZQy3S7giTwFnd1c-yLuvdaTaIOqRALJaY5PFCqPogSLVjNYcfnmB8opF6sQcxqhb8z8HhmKl-ImeeXFxO0KYl7H8Le6EyPd40kQ2dfppMJngOOq-Po3bMEMPxQpq2NuAsVGQ5tmr_QDROo3_gkUqfnX3_9-c8f9udmm9Ti_mXWgCLbIIhJ_RLnKHUpzJKHaNrzEFpTm0zdNPEj5ZZxKA57Mz3X_9AcBaTRXo9YckXpn3HyHbesZ0J5elFoFrwd097YYrLrmpMaqCSqbG7eDQ-Ai-a523Y1gr-ei32k87YO6RVF16l2L4M2ga_7K6o-h2C3jT1hDSrEVnuOC-B3Afvdf6FrQYQGWSYjE9HJC-rjAXL3zt9PefQ4WbbcY6Qk2R-ybbbWLx_WNeZ2nBHsav0ln8YSsgaBDASnz1rGYCLq9pgHA8VDsA6iLEoQhRYwYfRTUgLauMTkpcP8i4Sji-7hRic0KSfcz2oLkMnpPGYrpW67cq2-U6PFEvOl9d6H__yr-Z7rYpX9n-W7zLyXpKRQMoXuW3xu5_BW6x_ql96YbPta_DCW2gmeXsiQr3SBIeSDT2ql9DBDB20Mo1UQcQO7Krx0BT4WenDcHcLD0YEziW3f-aRE9TZF_L4XTg0yLtIKas_1edTOSfx25-tWTN0r58N1IwuMU2R2fBQUT9Pm0ZIGdKdOqAsrKi89G-nNBcuahStEfi7FqWZ3N-B0PTtvS8-3C5xZ9y1MjZ02eghLDGESRBzMx_2QLtCLtHlPEV_WOK2nb1s4hEo8QjtpjXFCadfRTjb3TEdFGhahBZC1ve2fiOFA7EXRVzEDh6jAs6iVCneTfUGkrSNd2asHmKWF14axNWb2CUHHURCQh_DY1f1SgEM1dBAmQenDTfILQUJULfhUP83_-z8rMFveWgYAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJleHAiOjE3MzQ0NDUyNTAsImFsbG93QWNjZXNzT3ZlclB1YmxpY0ludGVybmV0Ijp0cnVlfQ==', // Token de acesso
    tokenType: models.TokenType.Embed, // Tipo do token (Embed)
    settings: {
      panes: {
        filters: { visible: false }, // Esconde filtros
        pageNavigation: { visible: false } // Esconde navegação entre páginas
      },
     

    }
  };

  // Manipuladores de evento do Power BI
  eventHandlers = new Map([
    ['loaded', () => console.log('Power BI Report Loaded')],
    ['rendered', () => console.log('Power BI Report Rendered')],
    ['error', (event:any) => console.error('Error: ', event.detail)]
  ]);
}
