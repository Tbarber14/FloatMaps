import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeasureMapComponent } from './measure-map/measure-map.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SaveMapComponent } from './save-map/save-map.component';
import { ViewTripsComponent } from './view-trips/view-trips.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { LoginChangeComponent } from './login-change/login-change.component';
import { LandingMapComponent } from './landing-map/landing-map.component';

@NgModule({
  declarations: [
    AppComponent,
    MeasureMapComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    SaveMapComponent,
    ViewTripsComponent,
    TripDetailsComponent,
    UserDetailsComponent,
    EditUserDetailsComponent,
    LoginChangeComponent,
    LandingMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFE8E_qEMKLVh8xWJkcLNJfQa3_-eQOsU',
      libraries: ["places"]
    }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
