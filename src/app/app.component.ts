import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from './services/spinner/spinner.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'app';
  displaySpinner : boolean = false;
  private subs : Subscription;


  constructor(private spinner : SpinnerService, private cc : ChangeDetectorRef) {
    this.subs = this.spinner.$spinner.subscribe(result => {
      this.displaySpinner = result;
      this.cc.detectChanges();
    })
  }


  ngOnDestroy(): void {
    this.subs && this.subs.unsubscribe();
  }
}
