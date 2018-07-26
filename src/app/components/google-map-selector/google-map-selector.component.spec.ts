import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapSelectorComponent } from './google-map-selector.component';

describe('GoogleMapSelectorComponent', () => {
  let component: GoogleMapSelectorComponent;
  let fixture: ComponentFixture<GoogleMapSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
