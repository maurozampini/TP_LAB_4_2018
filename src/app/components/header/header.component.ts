import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material';
import { NuevoViajeFormComponent } from '../nuevo-viaje-form/nuevo-viaje-form.component';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() sidenav : MatSidenav;

  constructor(private route : Router, private matDialog : MatDialog, public auth : AuthService) { }

  ngOnInit() {
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  solicitarNuevoViaje() {
    this.matDialog.open(NuevoViajeFormComponent, { width : '60%'});
  }

  navigation(navTo) {
    this.route.navigate(['/' + navTo]);
    //this.sidenav.toggle();
  }
}
