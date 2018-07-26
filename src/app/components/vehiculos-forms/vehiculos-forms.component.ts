import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Vehiculo } from '../../model/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { AlertService } from '../../services/alert/alert.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { UploadFile, UploadEvent, FileSystemFileEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-vehiculos-forms',
  templateUrl: './vehiculos-forms.component.html',
  styleUrls: ['./vehiculos-forms.component.css']
})
export class VehiculosFormsComponent implements OnInit {

  public reactiveForm: FormGroup;
  public vehiculo : Vehiculo;
  public maskPatente = [/[A-Z]/, /[A-Z]/, '-',/[0-9]/,/[0-9]/,/[0-9]/, '-',/[A-Z]/, /[A-Z]/];
  public maskAnio = [/[1-2]/,/[0,9]/,/[0-9]/,/[0-9]/];
  public files: UploadFile[] = [];
  public foto : string = '';

  constructor(private fb : FormBuilder,
    public dialogRef: MatDialogRef<VehiculosFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public vSrv : VehiculoService, private alert : AlertService, private spinner : SpinnerService, private ch : ChangeDetectorRef) {
      this.vehiculo = new Vehiculo();
    this.reactiveForm = this.fb.group({
      comodidad : [this.vehiculo.comodidad, Validators.required],
      color : [this.vehiculo.color, Validators.required],
      patente : [this.vehiculo.patente, Validators.required],
      modelo : [this.vehiculo.modelo, Validators.required],
      marca : [this.vehiculo.marca, Validators.required],
      anio : [this.vehiculo.anio, Validators.required]
    });
  }

  ngOnInit() {
    if(this.data && this.data.patente) {
      this.vSrv.getVehiculo(this.data.patente).then(res => {
        this.vehiculo = res;
        console.log(this.vehiculo);
        this.reactiveForm = this.fb.group({
          comodidad : [this.vehiculo.comodidad, Validators.required],
          color : [this.vehiculo.color, Validators.required],
          patente : [this.vehiculo.patente, Validators.required],
          modelo : [this.vehiculo.modelo, Validators.required],
          marca : [this.vehiculo.marca, Validators.required],
          anio : [this.vehiculo.anio, Validators.required]
        });
        this.vehiculo.foto = this.data.patente + '.jpg';
        this.foto = this.vehiculo.foto;
      }).catch(err => {
        console.log(err);
      });
    }
  }


  guardar() {
    if(!this.foto) {
      let a = this.alert.create({
        message : 'Debe seleccionar una foto'
      });
      a.present();
      return;
    }
    this.spinner.showSpinner();
    if(this.vehiculo.vehiculoID) {
      this.vSrv.actualizar(this.reactiveForm.value).then(res => {
        if(this.files.length > 0) {

          this.vSrv.subiFotoVehiculo(this.reactiveForm.value.patente, this.files[0]).then(res => {

            setTimeout(() => {
              this.spinner.hiddenSpinner();
              this.dialogRef.close(true);
            }, 1000);
          }).catch(err => {
  
            this.spinner.hiddenSpinner();
            let a = this.alert.create({
              message : err.error.message,
              title : 'Error'
            });
            a.present();
          })
        } else {

          setTimeout(() => {
            this.spinner.hiddenSpinner();
            this.dialogRef.close(true);
          }, 1000);
        }
      }).catch(err => {
        this.spinner.hiddenSpinner();
        let a = this.alert.create({
          message : err.error.message,
          title : 'Error'
        });
        a.present();
      });
    } else {
      this.vSrv.insertar(this.reactiveForm.value).then(res => {
        this.vSrv.subiFotoVehiculo(this.reactiveForm.value.patente, this.files[0]).then(res => {

          setTimeout(() => {
            this.spinner.hiddenSpinner();
            this.dialogRef.close(true);
          }, 1000);
        }).catch(err => {

          this.spinner.hiddenSpinner();
          let a = this.alert.create({
            message : err.error.message,
            title : 'Error'
          });
          a.present();
        })
      }).catch(err => {
        this.spinner.hiddenSpinner();
        let a = this.alert.create({
          message : err.error.message,
          title : 'Error'
        });
        a.present();
      });
    }
  }

  eliminar() {
    let a = this.alert.create({
      message : '¿Desea eliminar el auto con la patente ' + this.vehiculo.patente + ' ?',
      buttons : [
        {
          text : 'Aceptar',
          handler : () => {
            this.eliminarConfirm();
          },
          color : 'primary'
        },
        'Cancelar'
      ]
    });
    a.presentConfirm();
  }
  eliminarConfirm() {

    this.spinner.showSpinner();
    this.vSrv.eliminar(this.vehiculo.patente).then(res => {
      setTimeout(() => {

        this.spinner.hiddenSpinner();
        this.dialogRef.close(true);
      }, 1000);
    }).catch(err => {
      this.spinner.hiddenSpinner();
      let a = this.alert.create({
        message : err.error.message,
        title : 'Error'
      });
      a.present();
    })
  }
  public dropped(event: UploadEvent) {
    this.spinner.showSpinner();
    if(event.files && event.files.length > 1) {
      let a = this.alert.create({
        message : 'Solo puede subir una foto',
        title : 'Error'
      })
      this.spinner.hiddenSpinner();
      a.present();
      return;
    } else if(event.files.length > 0)  {
      const fileEntry = event.files[0].fileEntry as FileSystemFileEntry;
      fileEntry.file((file : File) => {
        if(file.type == 'image/jpeg') {
          this.files = event.files;
          
  
      
            // Is it a file?
            if (fileEntry.isFile) {
                this.spinner.hiddenSpinner();
                console.log(file.name, file);
      
                this.foto = file.name;
                this.vehiculo.foto = file.name;
                this.ch.detectChanges();
            } else {
              let a = this.alert.create({
                message : 'Debe seleccionar una foto',
                title : 'Error'
              })
              this.spinner.hiddenSpinner();
              a.present();
            }
          
        } else {
           let a = this.alert.create({
             message : 'Solo puede subir fotos jpg',
             title : 'Error'
           })
           this.spinner.hiddenSpinner();
           a.present();
           return;
        }
      })
    }
    
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
}
