import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserSelectTripsComponent } from './view-user-select-trips.component';

describe('ViewUserSelectTripsComponent', () => {
  let component: ViewUserSelectTripsComponent;
  let fixture: ComponentFixture<ViewUserSelectTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserSelectTripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserSelectTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
