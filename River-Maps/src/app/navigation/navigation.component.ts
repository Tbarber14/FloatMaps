import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import { UserTripsService } from '../services/user-trips.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  event$
  onLandMap : boolean = true;
  onCreate: boolean = false;
  onView: boolean = false;
  onUserDetails: boolean = false;
  edit: boolean = false;
  constructor(private auth: AuthService, private router: Router, private location: Location, private tripService: UserTripsService) {
    this.event$
      =this.router.events
          .subscribe(
            (event: NavigationEvent) => {
              if(event instanceof NavigationEnd) {
                let location = this.location.path();
                this.edit = this.tripService.editTrip;
                if(location == "/lander"){
                  this.onLandMap = true;
                  this.onView = false;
                  this.onCreate = false;
                  this.onUserDetails = false;
                }
                else{
                  this.onLandMap = false;
                  this.onView = false;
                  this.onCreate = false;
                  this.onUserDetails = false;
                }

                if(location == "/view")
                {
                  this.onView = true;
                }

                if(location == "/map"){
                  this.onCreate = true;
                }

                if(location == "/userDetails"){
                  this.onUserDetails = true;
                }
              }
            });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

  signOut(){
    this.edit = false;
    this.tripService.editTrip = false;
    this.tripService.clearTripCache();
    this.auth.removeUser();
  }

  goBack(){
    let location = this.location.path();
    if(location != "/save"){
      this.edit = false;
      this.tripService.editTrip = false;
      this.tripService.clearTripCache();
    }

    this.location.back()
  }
}