import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeasureMapComponent } from './measure-map/measure-map.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginHeaderComponent } from './login-header/login-header.component';

@NgModule({
  declarations: [
    AppComponent,
    MeasureMapComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    LoginHeaderComponent
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
