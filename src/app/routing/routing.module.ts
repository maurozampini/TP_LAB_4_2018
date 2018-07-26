import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ruteos } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(Ruteos)
  ],
  declarations: [],
  exports : [
    RouterModule
  ]
})
export class RoutingModule { }
