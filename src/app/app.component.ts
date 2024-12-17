import { Component, ViewChild } from '@angular/core';
import { MenuItem, PrimeNGConfig, MessageService } from 'primeng/api';
import { VP_BPM } from 'src/beans/VP_BPM';
// import formValidate from 'src/functions/Form_Validate';
import { Validate_Service } from '../services/Validate_Service';

import axios from 'axios';

import { Messages } from 'primeng/messages';
import * as models from 'powerbi-models';

declare var workflowCockpit: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, Validate_Service],
})
export class AppComponent {
  public title = 'ProjetoPadrao';

  checked: boolean = false;

  public vp: VP_BPM = new VP_BPM();

  public ngOnInit(): void {
    this.vp.Buscando_WS = false;
  }
}
