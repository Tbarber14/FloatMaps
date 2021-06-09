import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MeasureMapComponent } from './measure-map/measure-map.component';
import { RegisterComponent } from './register/register.component';
import { SaveMapComponent } from './save-map/save-map.component';
import { ViewTripsComponent } from './view-trips/view-trips.component';

const routes: Routes = [
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path:"map",
    component: MeasureMapComponent
  },
  {
    path:"save",
    component: SaveMapComponent
  },
  {
    path:"view",
    component: ViewTripsComponent
  },
  {
    path:"**",
    redirectTo:"login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
