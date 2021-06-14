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
  onDetails : boolean = false;
  isEdit: boolean = false;

  constructor(private auth: AuthService, private router: Router, private Location: Location, private tripService: UserTripsService) {
    this.event$
      =this.router.events
          .subscribe(
            (event: NavigationEvent) => {
              if(event instanceof NavigationEnd) {
                this.isEdit = this.tripService.editTrip;
                let location = this.Location.path();
                if(location == "/map"){
                  this.onMap = true;
                  this.onDetails = false;
                }
                else if(location == '/details'){
                  this.onMap = false;
                  this.onDetails = true;
                }
                else{
                  this.onMap = false;
                  this.onDetails = false;
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

  turnOffEdit(){
    this.tripService.editTrip = false;
    this.isEdit = false;
  }

}