import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingMapComponent } from './landing-map/landing-map.component';
import { LoginComponent } from './login/login.component';
import { MeasureMapComponent } from './measure-map/measure-map.component';
import { RegisterComponent } from './register/register.component';
import { SaveMapComponent } from './save-map/save-map.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
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
    path:"lander",
    component: LandingMapComponent
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
    path:"details",
    component: TripDetailsComponent
  },
  {
    path:"userDetails",
    component: UserDetailsComponent
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
