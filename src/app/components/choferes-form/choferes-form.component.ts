import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Vehiculo } from '../../model/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { Chofer } from '../../model/chofer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from '../../services/alert/alert.service';
import { ChoferService } from '../../services/chofer/chofer.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { UploadFile, UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-choferes-form',
  templateUrl: './choferes-form.component.html',
  styleUrls: ['./choferes-form.component.css']
})
export class ChoferesFormComponent implements OnInit {

  public reactiveForm: FormGroup;
  public secondPassword : string;
  public vehiculos : Array<Vehiculo>;
  public chofer : Chofer = new Chofer();
  public files: UploadFile[] = [];
  public foto : string = '';

  constructor(private formBuilder : FormBuilder, private vehiculoService : VehiculoService,public dialogRef: MatDialogRef<ChoferesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public choferService : ChoferService , private alert : AlertService, private spinner : SpinnerService, private cc : ChangeDetectorRef) {
    this.reactiveForm = this.formBuilder.group({
      activo : new FormControl(false),
      nombre :  new FormControl('', [Validators.required]),
      apellido :  new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      vehiculoID : new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.vehiculoService.getAll().then(res => {
      this.vehiculos = res;
    }).catch(err => {
      console.log(err);
    });
    if(this.data && this.data.email) {
      this.choferService.getChofer(this.data.email).then(res => {
        this.chofer = res;
        console.log(this.chofer);
        this.reactiveForm = this.formBuilder.group({
          activo :  new FormControl(this.chofer.activo),
          nombre :  new FormControl(this.chofer.nombre, [Validators.required]),
          apellido :  new FormControl(this.chofer.apellido, [Validators.required]),
          password : new FormControl(this.chofer.password, [Validators.required, Validators.minLength(6)]),
          email : new FormControl(this.chofer.email, [Validators.required, Validators.email]),
          vehiculoID : new FormControl(this.chofer.vehiculoID, [Validators.required])
        });
        this.chofer.foto = this.data.email + '.jpg';
        this.foto = this.chofer.foto;
      }).catch(err => {
        console.log(err);
      });
    }
  }

  getErrorMessage() {
    return this.reactiveForm.controls.email.hasError('required') ? 'El correo es requerido' :
        this.reactiveForm.controls.email.hasError('email') ? 'Ingrese un correo valido' :
            '';
  }

  getErrorMessagePassword() {
    return this.reactiveForm.controls.password.hasError('required') ? 'El password es requerido' :
    this.reactiveForm.controls.password.hasError('minlength') ? 'Debe tener minimo 6 caracteres' : '';
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
    if(this.chofer.usuarioID) {
      this.choferService.acutalizar(this.reactiveForm.value).then(res => {
        if(this.files.length > 0) {

          this.choferService.subiFotoChofer(this.chofer.email,this.files[0]).then(res => {
            setTimeout(() => {
              this.spinner.hiddenSpinner();
              this.dialogRef.close(true);
    
            }, 1500);
          }).catch(err => {
            setTimeout(() => {
    
              this.spinner.hiddenSpinner();
              let alerta = this.alert.create({
                message : err.error.message,
                title : '¡Error!',
                buttons : ['Aceptar']
              });
              alerta.present();
            }, 1500);
            console.log(err);
  
          });
        } else {

          setTimeout(() => {
            this.spinner.hiddenSpinner();
            this.dialogRef.close(true);
  
          }, 1500);
        }
      }).catch(err => {
        setTimeout(() => {

          this.spinner.hiddenSpinner();
          let alerta = this.alert.create({
            message : err.error.message,
            title : '¡Error!',
            buttons : ['Aceptar']
          });
          alerta.present();
        }, 1500);
        console.log(err);
      })
    } else {
      this.choferService.guardar(this.reactiveForm.value).then(res => {
        this.choferService.subiFotoChofer(this.reactiveForm.value.email, this.files[0]).then(res => {
          setTimeout(() => {
            this.spinner.hiddenSpinner();
            this.dialogRef.close(true);
  
          }, 1500);
        }).catch(err => {
          setTimeout(() => {
  
            this.spinner.hiddenSpinner();
            let alerta = this.alert.create({
              message : err.error.message,
              title : '¡Error!',
              buttons : ['Aceptar']
            });
            alerta.present();
          }, 1500);
          console.log(err);

        });
      }).catch(err => {
        setTimeout(() => {
          this.spinner.hiddenSpinner();
          let alerta = this.alert.create({
            message : err.error.message,
            title : '¡Error!',
            buttons : ['Aceptar']
          });
          alerta.present();

        }, 1500);
        console.log(err);
      });
    }
  }

  eliminar() {
    let a = this.alert.create({
      message : '¿Desea eliminar a ' + this.chofer.nombre + ' ' + this.chofer.apellido + '?',
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
    this.choferService.eliminar(this.chofer.email).then(res => {
      setTimeout(() => {
        this.dialogRef.close(true);
        this.spinner.hiddenSpinner();
      }, 1500);
    }).catch(err => {
      setTimeout(() => {
        this.spinner.hiddenSpinner();
      }, 1500);
      console.log(err);
    });
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
                this.chofer.foto = file.name;
                this.cc.detectChanges();
      
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
