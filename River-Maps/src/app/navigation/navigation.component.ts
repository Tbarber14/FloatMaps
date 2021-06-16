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
  onMap : boolean = true;
  edit: boolean = false;
  constructor(private auth: AuthService, private router: Router, private location: Location, private tripService: UserTripsService) {
    this.event$
      =this.router.events
          .subscribe(
            (event: NavigationEvent) => {
              if(event instanceof NavigationEnd) {
                let location = this.location.path();
                this.edit = this.tripService.editTrip;
                if(location == "/map"){
                  this.onMap = true;
                }
                else{
                  this.onMap = false;
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