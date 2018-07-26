import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertConfig, EcoAlert } from '../../model/alert';

@Injectable()
export class AlertService {

  constructor(private matDialog : MatDialog) { }

  public create(config : AlertConfig) : EcoAlert {
    return new EcoAlert(this.matDialog, config);
  }


}
