import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  @Input() sidenav : MatSidenav;
  reaload : boolean = true;

  constructor(private route : Router, private auth : AuthService, private dc : ChangeDetectorRef) {

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    
  }

  navigation(navTo) {
    this.route.navigate(['/' + navTo]);
    this.sidenav.toggle();
  }
}
