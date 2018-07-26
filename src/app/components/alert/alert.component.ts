import { Component, OnInit, Inject } from '@angular/core';
import { AlertButton } from '../../model/alert';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  
  title : string = 'Aviso!';
  message : string;
  buttons : Array<AlertButton>;

  constructor(public matDialog : MatDialog, public dialogRef: MatDialogRef<AlertComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title ? data.title : this.title;
    this.message = data.message;
  }

  ngOnInit() {
    this.buttons = this.data.buttons.map(button => {
      if(typeof button === 'string'){
        return {text : button};
      }
      return button;
    });
  }

  buttonClick(b : AlertButton) {
    let shouldDismiss = true;
    if(b.handler) {
      if (b.handler() === false) {
        shouldDismiss = false;
      }
    }
    if(shouldDismiss) {
      this.dialogRef.close(b.role);
    }
  }

}
