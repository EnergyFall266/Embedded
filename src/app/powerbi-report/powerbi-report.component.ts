import { Component, ViewChild, AfterViewInit } from '@angular/core';
import * as models from 'powerbi-models';
import { PowerBIReportEmbedComponent } from 'powerbi-client-angular';
import { Report } from 'powerbi-client';

@Component({
  selector: 'app-powerbi-report',
  templateUrl: './powerbi-report.component.html',
  styleUrls: ['./powerbi-report.component.scss'],
})
export class PowerbiReportComponent implements AfterViewInit {
  @ViewChild(PowerBIReportEmbedComponent)
  reportObj!: PowerBIReportEmbedComponent;
  report!: Report;
  ngAfterViewInit(): void {
    this.report = this.reportObj.getReport();
  }
  // Configuração do relatório Power BI
  embedConfig = {
    type: 'report', // Tipo do embed (relatório)
    id: 'fa000586-a94a-4c01-a916-3577dcffe835', // Report ID
    embedUrl:
      'https://app.powerbi.com/reportEmbed?reportId=fa000586-a94a-4c01-a916-3577dcffe835', // URL de embed
    accessToken:
    'H4sIAAAAAAAEACWTR4rsWgIF91JTNci7hjdI2ZRP6crP5L1N-c_fe9ej5wEHgjj__HySu5-S_Oe_PxWyN-dwV9QDaEUWVRFF_PcVbznlEn31JbQEdK_DR0v0nBpfdqJFrqB6WKKr7ywMxsoHNl3wYZfekuowk9YXODp-3xtUMHHOLjjMN3gkZHXrhdlxIlzPYLAgAqy0o6qMjCTnP_u8f8RwTd2D0-hGj6Q07MlPrfSZtD8tX6UJUecD2xYHZE7tJgQMU7JeBNwcXSI8uM6L66qjIqWjlQyYE4znS2ci5Xcp00RPVR0wNh4lobAqIcBIl4_WZIccHuB1qCbXbGL9zbco5cPCOr8mmaXZLiat7x5RPUxPB2CywxJzRWQ4PSoH_Yar8avyyICQ5LwGQlRNEA9QJf-mUJH7YjyFicai9rx8Jp51t9tYW6XCJY8kjBuyS-GC3A4TN_3lSdKXDydmfaB0NGZhqvFsK0nWSXDu4kOM09hvPb48495U9wW_n8F-xXqsHL56J_FCndKVe9DgUaE6xFDTOidVNhkgtU6PXLaooZXg0E6TIjp8SDnNAoVZacyJTySHI3tg8ObWxu1OCI1yLyeopp63aYvJgR3cuVlpXNRkOjNR9MFRjzFRXPdxxma2dRYExbnA8oq4Cio7m3rMJYJMOX9ZwgH5UcLI0xLL71dlF_5C4K1fFjsMaeSjI1B5GYmlfAygHGmDNvygfPt6N0u-U-SbGnNaP9SzmwdWUhYBdRUYkZWcgNtYgdhEMcaugaEt00SrlfCzQJKz0Tew63eItXL5fWsHj2ZCrX0NgfI4pEprZLjgAS3zRB0FQdpXc7B-a61qtC8yfK3MKpc3WprVapdSu3vnw5bGhWgO6AIkW0XztkM4NT9pRUnV69HvwksngKinZRnrz39--PWet0kr7t87vRv805kE54wp-oxm1EzBRWjj0W7W2zuXZUZ2ENOP8t4PHG7wfCnUqQYPNgjrdLmUYCS8YOdFR_i0sHjSMzwRBHdkEouBqu4tb4lZCXod_hLf9byIWwllDB7e0Hg5otiE8eE9KXE5JmcCbp98C11G46Z9R2YeJtVinIzT_Chr-GFEPbNlCY7TBeYQINPctdx3UdMQql3XHDjMGNuS-gp-84_f8r6hkjyzS5juO-7Brp8xz3fwd5z-4p72-3QgxwZ40uopN9crpvhDCVTBKmcXLuAEVpKNOaYqUvZZgjsUMi0UTSFTq0OobRE_CmfB8uxTzzYyFFu9yswBQpU64Q9uUOXrz5-_mu-5LlbF_7V8L1AtOFdt8XYkcPJkuJ9X_38KNNWYbPta_GIisXSmVYhx3teNc8oqhXNRJEhoxBqIZUeTePAWAj1xniao71HJZVC0PwTU9lq888Sf4wvAkie0_mA8aIWjrlyj4WFwy6qwlwGR9g0p1CsGaEb2SRdjXVK-c1r9Yn8NtUwndLxEH_j7498ca7oU7vwuRJuIpUixqBP1fekFRlM21Oa4ea58wc4yQ8Fb-Q4h0vIxB68_XgvPTy2Tjc3crX-7h9lAvE5PSPoOl5biRmKfTjD6ucrM9RU8TxpXjOwxYQgzp0ExhTRo9Qmbr3lN-ltCWaHDcIBKJDujtkPd_sd6v4NOklnLGWqXw1AmiO1kMzglGodikKyH7acdjfzT6vjmr-Z__wf6pv40QgYAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJleHAiOjE3MzQ0NzEyNzksImFsbG93QWNjZXNzT3ZlclB1YmxpY0ludGVybmV0Ijp0cnVlfQ==',
    tokenType: models.TokenType.Embed, // Tipo do token (Embed)
    settings: {
      panes: {
        filters: { visible: false }, // Esconde filtros
        pageNavigation: { visible: false }, // Esconde navegação entre páginas
      },
    },
  };

  // Manipuladores de evento do Power BI
  eventHandlers = new Map([
    ['loaded', () => this.onReportLoaded()],
    ['rendered', () => console.log('Power BI Report Rendered')],
    ['error', (event: any) => console.error('Error: ', event.detail)],
  ]);

  onReportLoaded() {
    console.log('Report Loaded');
    this.report = this.reportObj.getReport(); // Captura o report object
    this.applyFilters();
  }

  // Método para aplicar filtros no relatório
  async applyFilters() {
    const filter: models.IBasicFilter = {
      $schema: 'http://powerbi.com/product/schema#basic',
      filterType: models.FilterType.Basic,
      target: {
        table: 'Funcionarios',
        column: 'Nivel4',
      },
      operator: 'In',
      values: ['00020C08'],
    };

    try {
      if (this.report) {
        // Aplica o filtro no relatório
        await this.report.updateFilters(models.FiltersOperations.Add, [filter]);
        console.log('Filtro aplicado com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao aplicar filtro:', error);
    }
  }
}
