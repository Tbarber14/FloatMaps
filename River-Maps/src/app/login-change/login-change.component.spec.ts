import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginChangeComponent } from './login-change.component';

describe('LoginChangeComponent', () => {
  let component: LoginChangeComponent;
  let fixture: ComponentFixture<LoginChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
