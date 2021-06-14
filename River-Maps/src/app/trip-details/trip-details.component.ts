import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Trip } from 'src/models/Trip';
import { AuthService } from '../services/auth.service';
import { UserTripsService } from '../services/user-trips.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  tripInfo!: Trip;

  //Default coords
  lat = 36.1627;
  lng = -86.7816;
  markersPlaced: boolean = false;
  
  title: String = "";
  description: String = "";
  publishDate: String = "";
  image: String = "";


  map!: google.maps.Map<Element>;

  constructor(private readonly geolocation$: GeolocationService, private auth: AuthService, private router:Router, private tripService: UserTripsService){
  }

  ngOnInit(): void {
    // Checks if the user is logged in
    if(this.auth.retrieveUser() == null){
      this.router.navigate(['/login']);
    }

    this.getTrip();

    let centerMap = this.findAverageLocation();
    this.lat = centerMap[0]; 
    this.lng = centerMap[1];
  }

    //Initializes map
    mapReady(event: any) {
      this.map = event;
      this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('milesBanner')  as HTMLInputElement);
      document.getElementById('distanceTotal')!.innerHTML = this.tripInfo.distance + " miles";
  }

  getTrip(){
    this.tripInfo = this.tripService.getTripCache();
  }

  findAverageLocation(){
    let latTotal = 0;
    let lngTotal = 0;
    let latAvg = 0;
    let lngAvg = 0;
    let coordCount = this.tripInfo.allMarkers.length;

    this.tripInfo.allMarkers.forEach(marker => {
      latTotal += marker[0];
      lngTotal += marker[1];
    });

    latAvg = latTotal/coordCount;
    lngAvg = lngTotal/coordCount;

    return [latAvg, lngAvg];
  }
}
