import { Component, ViewChild, AfterViewInit, Input, OnInit } from '@angular/core';
import * as models from 'powerbi-models';
import { PowerBIReportEmbedComponent } from 'powerbi-client-angular';
import { Report } from 'powerbi-client';
import { VP_BPM } from 'src/beans/VP_BPM';

@Component({
  selector: 'app-powerbi-report',
  templateUrl: './powerbi-report.component.html',
  styleUrls: ['./powerbi-report.component.scss'],
})
export class PowerbiReportComponent implements OnInit {
  @Input() vp!: VP_BPM;
  @ViewChild(PowerBIReportEmbedComponent)
  reportObj!: PowerBIReportEmbedComponent;
  report!: Report;
  embeddedToken:string = this.vp.embedToken;
  embedConfig: any;
   constructor() {
    console.log(this.vp.embedToken);

   }
  ngAfterViewInit(): void {
    this.report = this.reportObj.getReport();
    console.log(this.report);
  }
    ngOnInit(): void {
      console.log('ngOnInit chamado');
      this.initializeEmbedConfig(); // Configura o embedConfig
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //   if (changes['vp'] && changes['vp'].currentValue) {
    //     console.log('ngOnChanges chamado');
    //     this.initializeEmbedConfig(); // Atualiza embedConfig se vp mudar
    //   }
    // }




    initializeEmbedConfig(): void {
      if (this.vp) {

  // Configuração do relatório Power BI
  this.embedConfig = {
    type: 'report', // Tipo do embed (relatório)
    id: 'fa000586-a94a-4c01-a916-3577dcffe835', // Report ID
    embedUrl:
      'https://app.powerbi.com/reportEmbed?reportId=fa000586-a94a-4c01-a916-3577dcffe835', // URL de embed
    accessToken: this.embeddedToken, // Token de acesso
    tokenType: models.TokenType.Embed, // Tipo do token (Embed)
    settings: {
      panes: {
        filters: { visible: false }, // Esconde filtros
        pageNavigation: { visible: false }, // Esconde navegação entre páginas
      },
    },
  };
  console.log('Embed config inicializado:', this.embedConfig);
}
}

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
