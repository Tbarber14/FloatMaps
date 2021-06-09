import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  event$
  onMap : boolean = true;

  constructor(private auth: AuthService, private router: Router, private Location: Location) {
    this.event$
      =this.router.events
          .subscribe(
            (event: NavigationEvent) => {
              if(event instanceof NavigationEnd) {
                let location = this.Location.path();
                if(location != "/map"){
                  this.onMap = false;
                }
                else{
                  this.onMap = true;
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

}