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
import { LoginHeaderComponent } from './login-header/login-header.component';
import { SaveMapComponent } from './save-map/save-map.component';
import { ViewTripsComponent } from './view-trips/view-trips.component';

@NgModule({
  declarations: [
    AppComponent,
    MeasureMapComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    LoginHeaderComponent,
    SaveMapComponent,
    ViewTripsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFE8E_qEMKLVh8xWJkcLNJfQa3_-eQOsU'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
