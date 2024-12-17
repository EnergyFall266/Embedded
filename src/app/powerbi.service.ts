import { Injectable } from '@angular/core';
import * as powerbiClient from 'powerbi-client';
import * as models from 'powerbi-models';

@Injectable({
  providedIn: 'root'
})
export class PowerBIService {
private powerbi: powerbiClient.service.Service = window['powerbi']
  private report!: powerbiClient.Report

  constructor(  ) {}

  // Método para embutir (embed) o relatório
  public async embedReport(
    embedContainer: HTMLElement,
    accessToken: string,
    embedUrl: string,
    reportId: string,
    tokenType: models.TokenType
  ): Promise<void> {
    const config: models.IReportEmbedConfiguration = {
      type: 'report',
      tokenType: tokenType,
      accessToken: accessToken,
      embedUrl: embedUrl,
      id: reportId,
      permissions: models.Permissions.All,
      settings: {
        panes: {
          filters: { visible: false },
          pageNavigation: { visible: false }
        }
      }
    };

    this.report = this.powerbi.embed(embedContainer, config) as powerbiClient.Report;

    return new Promise((resolve, reject) => {
      this.report.on('loaded', () => {
        console.log('Relatório carregado.');
        resolve();
      });
      this.report.on('error', (event) => {
        console.error('Erro no relatório:', event.detail);
        reject(event.detail);
      });
    });
  }

  // Método para aplicar filtros
  public async applyFilter(table: string, column: string, values: string[]) {
    const filter: models.IBasicFilter = {
      $schema: 'http://powerbi.com/product/schema#basic',
      filterType: models.FilterType.Basic,
      target: { table, column },
      operator: 'In',
      values
    };

    try {
      await this.report.updateFilters(models.FiltersOperations.Add, [filter]);
      console.log('Filtro adicionado.');
    } catch (error) {
      console.error('Erro ao aplicar filtro:', error);
    }
  }
}
