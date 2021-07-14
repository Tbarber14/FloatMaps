import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Trip } from 'src/models/Trip';
import { AuthService } from '../services/auth.service';
import { UserTripsService } from '../services/user-trips.service';

@Component({
  selector: 'app-landing-map',
  templateUrl: './landing-map.component.html',
  styleUrls: ['./landing-map.component.css']
})
export class LandingMapComponent implements OnInit {
  currentUser: String = "";
  allTrips: Trip[] = [];
  allTripsStartLocations!: [number, number][]

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
    else{
      this.currentUser = this.auth.retrieveUser().email;
    }

    // Finds users geolocation
    this.setCurrentLocation()

    this.tripService.findTripByEmail(this.currentUser).subscribe(trips => {
      this.allTrips = trips as unknown as Trip[]
    })

    if(this.allTrips == []){
      
      this.centerOnLocation();
    }
  }

    //Initializes map
    mapReady(event: any) {
      this.map = event;

      this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('milesBanner')  as HTMLInputElement);
      this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('CreateTrip')  as HTMLInputElement);
      this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('centerOnLocation')  as HTMLInputElement);
  }

  setCurrentLocation(){
    this.geolocation$.subscribe(position => {this.lat = position.coords.latitude; this.lng = position.coords.longitude});
  }

  centerOnLocation(){
    this.map.setCenter({ lat: this.lat, lng: this.lng });
  }

  findAverageLocation(){
    let latTotal = 0;
    let lngTotal = 0;
    let latAvg = 0;
    let lngAvg = 0;
    let coordCount = this.allTripsStartLocations.length;

    this.allTripsStartLocations.forEach(marker => {
      latTotal += marker[0];
      lngTotal += marker[1];
    });

    latAvg = latTotal/coordCount;
    lngAvg = lngTotal/coordCount;

    return [latAvg, lngAvg];
  }

  openTripDetails(trip: Trip){
    console.log("trips cached!!!");
    this.tripService.cacheTrip(trip);
    this.router.navigate(["details"]);
  }

  goToCreateTrip(){
    this.router.navigate(["map"]);
  }

  goToListTrips(){
    this.router.navigate(["view"]);
  }
}
