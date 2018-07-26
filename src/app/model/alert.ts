import { MatDialog, MatDialogRef } from "@angular/material";
import { AlertComponent } from "../components/alert/alert.component";
import { Observable } from 'rxjs';

export interface AlertConfig {
    title?: string;
    message? : string;
    buttons? : (AlertButton|string)[];
}

export interface AlertButton {
    text?:string;
    role?:string;
    color?:string;
    cssClass?:string;
    handler?:(value?:any) => boolean|void;
}

export class EcoAlert {
    private dialogRef : MatDialogRef<AlertComponent>;
    
    constructor(private matDialog : MatDialog, private config : AlertConfig) {
    }
    public present() : void {
        this.dialogRef = this.matDialog.open(AlertComponent, { data : { message : this.config.message, title : this.config.title, buttons : ['Cerrar'] }});
    }
    public presentConfirm() : void {
        this.dialogRef = this.matDialog.open(AlertComponent, { data : { message : this.config.message, title : this.config.title, buttons : this.config.buttons }});
    }
    public dismiss() : void {
        this.dialogRef.close();
    }
    public afterClose() : Observable<any> {
        return this.dialogRef.afterClosed();
    }
}