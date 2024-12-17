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
    id: 'fa000586-a94a-4c01-a916-3577dcffe835', // ID do relatório
    embedUrl:
      'https://app.powerbi.com/reportEmbed?reportId=fa000586-a94a-4c01-a916-3577dcffe835', // URL de embed
    accessToken:
      'H4sIAAAAAAAEAB2Uta7EVgBE_-W1jmSmSCkM17zrNUNnZl5jlH_PS_pp5hzN_P3zSe5-SvKfP39od_y23upa17XN-5CqbjZaZNk56kpR_T4zHH5MN_KiTW0bMl_QomgJZL4J6IY6Dsje0jc70PSb1An1nuSsSaGXT9GGqakDyFahCXJ-l8pOz8iaKPnwU9dpoSv1tJEqKlsMG3E1KNW4XWTnwtek86mgzkxU1kDlZlJSfQqAZi5zlgS4Cf3FhJnX8dPCUx0koNGbzDGDgz1vYBf5eYZ1Oy6RKPiVKCjLsDUxN8kFTnvHG3tou3G8hLO-royhfSgVt4U6BJzo729vOza0M5Bvlm6b575Q-XwBLfaAno8ZaslKseC65RC68eXb51Rf8jbme71-bt9gGUJU2RsyzkwShl7GuoL0dB__UDGTPPIXSFVENJAu6eKxyKK4uUJ3cAY2LfFVJ4P_6GbdRfWDgK2tC25CRbE2eXTCLXyzGrd-U8E6H7cgKZumginPGzZ-F3OVfwP1FFxpT-gWUb8CBuCvJq-BFa1-xhG5D8FZF80TQUeOMi-17tgXIkELw2gSBoia0rrQSyc_xrCyvbH1eHorwD-7-biQ5rOF798JFzowEfYmYyMNEkHwXXZtGPOl9LIsbHVArAFk4iPVnmwZYVpp6KGeia5LWa0IXwrMlnjiTDb7MX2hQD6kuPv0piIbImT9ZiYqwCOBskNJXNrzurcwnH_7o5DS4gfP6e8pbYwye4cneqmPyj7H1fca88J8xjGxdExkokdl5mVXbyv_SGw5dsJcYnTKULR_bYA_RLPQ3ul6IT6yC1KHscTaK-ywFSUBL8BvyTMs94b54lIAvkfQdSylOy8D2XboY8NRFmhdXcKGWD_YSJ4rD9g5pOdyilxSIqYIKn_--BHWe_5OenH_zinMNHE-r8h1eA-eoxk9WbXfu3sXg8hCZGnUq6CkZQ33BUdcHqOOX426gow17OndytqZwoyoFrAuQk8biXvumBnoqyGpwxbDdY9z6Sj6jZJhAIPJm1h2xVbZoQtrJAIkZd02LlLb30NzLxAVSyAzkAGIk7tQEYjm8jiGi_lhgTto2jOn-zLifU9jT3MWYjMyJK5vqJIs9Od6FwXGTYZTWQAvRkKQMLat2SW7FNNL_UGhyVhfOZRPnS6o9UCusYD7qvyjYl53KO73sXe1s-HuLEDEloG23W33hARswBw-ErTQ0H3odCcBTxXLi4nqS6n0hfgcxxOvN5Rn6p1tWxPrdTPWX3_9h_me62JV_V_KKPzGU54FQShW4VpF0rJC3vl_ymmqMfnua_GfjEVL8KeEJMv3nbQ4-rUB-D6vC59gyO75gr_VrOKhK9LBg_eyD0f4iuSbvuQl7N1wdILl0YuGEslJ9TYFL3aO80325SPz5tVQOBx50FQSIjD1RqJNBfXxcgUexxYVmWAvdolM9IFkyf5I2IabFf3azCl_q1KTiP1kT2FlDvPomJfZWmiB2Kwb21RjjDOMdQMF1_wtNJSp-jhndTkHFINUfg_ZIXaccfE0_KC5vZs8Bj6mqGc5aVTRZoApSAGkXl6N7hduDF5j86qCuYmNv2Bx5DUblxiE_Gp-XGZz5niwyr2rupShZIwQ7aMr9l7I4IzJg09bAmJfLdkzlszxyAKPBv6_jH_-BQuXOZpCBgAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJleHAiOjE3MzQ0NjAzNDAsImFsbG93QWNjZXNzT3ZlclB1YmxpY0ludGVybmV0Ijp0cnVlfQ==', // Token de acesso
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
        table: 'Funcionarios', // Substitua pelo nome da tabela
        column: 'Nivel4', // Substitua pelo nome da coluna
      },
      operator: 'In',
      values: ['00020C08'], // Valores do filtro
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
