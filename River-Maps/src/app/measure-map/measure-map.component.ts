import { MapsAPILoader } from '@agm/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Trip } from 'src/models/Trip';
import { AuthService } from '../services/auth.service';
import { UserTripsService } from '../services/user-trips.service';

@Component({
  selector: 'app-measure-map',
  templateUrl: 'measure-map.component.html',
  styleUrls: ['measure-map.component.css'],
})

export class MeasureMapComponent {

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  
  allMarkers: [number, number][] =[];
  tripToEdit!: Trip;

  //Default coords
  lat = 36.1627;
  lng = -86.7816;
  zoom!: number;
  address!: string;
  private geoCoder!: google.maps.Geocoder;
  map!: google.maps.Map<Element>;

  roundedDistance: number = 0;
  markersPlaced: boolean = false;
  editTrip: boolean = false;
  distanceBanner: Number = 0;
  
  title: string = "";
  description: string = "";
  image: string = "";

  constructor(private readonly geolocation$: GeolocationService, private auth: AuthService, private router:Router, private tripService: UserTripsService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone){
    // Finds the users coordinates

  }

  ngOnInit(): void {
    // Checks if the user is logged in
    if(this.auth.retrieveUser() == null){
      this.router.navigate(['/login']);
    }

    //Checks if a trip is being edited
    if(this.tripService.editTrip){
      this.tripToEdit = this.tripService.getTripCache();
      this.editTrip = true;
      this.allMarkers = this.tripToEdit.allMarkers;
      this.distanceBanner = this.tripToEdit.distance;
    }

    else{
      this.editTrip = false;
    }

    // All of the below in the init function is for the search bar that will need to be enabled with Google Cloud Billing
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  setCurrentLocation(){
    this.geolocation$.subscribe(position => {this.lat = position.coords.latitude; this.lng = position.coords.longitude});
  }
  
  //Initializes map
  mapReady(event: any) {
    this.map = event;
    this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById('search')  as HTMLInputElement);
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('milesBanner')  as HTMLInputElement);
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('SaveMap')  as HTMLInputElement);
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('DeleteLast')  as HTMLInputElement);
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('DeleteAll')  as HTMLInputElement);
    document.getElementById('distanceTotal')!.innerHTML = this.distanceBanner + " miles";
}

// Gets coordinate info from map, updates allMarkers and calculates the total distance between the first and last marker
  public pickNextLocation(event: any): void{
    this.allMarkers[this.allMarkers.length]=[event.coords.lat, event.coords.lng];
    this.changeBannerDistance();
  }

  //Updates the total distance, from first to last marker, in the banner at the top of map
  changeBannerDistance(){
    let totalDistance = this.calcTotal()
    if(totalDistance < 1000){
      this.roundedDistance = Math.round(totalDistance * 100)/100
    }

    else{
      this.roundedDistance = Math.round(totalDistance * 1)/1
    }

    document.getElementById('distanceTotal')!.innerHTML = this.roundedDistance + " miles";
  }

  // Deletes last marker placed
  deletePolyPoint(){
    this.allMarkers.pop();
    this.changeBannerDistance()
  }

  //Deletes all markers placed 
  deleteAllPolyPoints(){
    this.allMarkers = [];
    this.changeBannerDistance()
  }

  // Caches markers on the map for the save component to use and navigate to the save component if there are more than 1 markers
  saveMap(){

    if(this.editTrip){
      let tripInfo = this.tripToEdit;

      if(this.allMarkers.length > 1){
        console.log("First Trip info: " + tripInfo);
        this.tripService.cacheTrip(tripInfo);
  
        this.router.navigate(['/save']);
      }
    }
    else{
      let tripInfo : any = {
        email: this.auth.retrieveUser().email,
        title: this.title,
        description: this.description,
        image: this.image,
        publishDate: new Date(),
        distance : this.roundedDistance,
        allMarkers: this.allMarkers,
      }

      if(this.allMarkers.length > 1){
        console.log("First Trip info: " + tripInfo.publishDate);
        this.tripService.cacheTrip(tripInfo);
  
        this.router.navigate(['/save']);
      }
    }


  }

  // Finds the distance of all points recorded in the allMarkers array by order they were pushed to the array
  calcTotal(){
    var totalDistance = 0;
    for(var i = 1; i < this.allMarkers.length; i++){
      totalDistance += this.calcCrow(this.allMarkers[i-1][0], this.allMarkers[i-1][1], this.allMarkers[i][0], this.allMarkers[i][1]);
    }

    return totalDistance;
  }

  //Finds distance between to points
  calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) 
    {
      const MILES_CONVERSION = 0.621371;
      var R = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      var lat1 = this.toRad(lat1);
      var lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c * MILES_CONVERSION;
      return d;
    }

    // Converts numeric degrees to radians
    toRad(Value: number) 
    {
        return Value * Math.PI / 180;
    }
}
