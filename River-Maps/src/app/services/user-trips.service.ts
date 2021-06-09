import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const allTripsUrl = 'http://localhost:3000/Trips/getTrips'
const addTripUrl = 'http://localhost:3000/Trips/addTrips'
const yourTripsUrl = 'http://localhost:3000/Trips/yourTrips'

@Injectable({
  providedIn: 'root'
})
export class UserTripsService {

  allMarkers: [number, number][] =[];

  constructor(private http: HttpClient) { }

  cacheMap(map: [number, number][]){
    this.allMarkers = map;
  }

  getMapCache(){
    return this.allMarkers;
  }

  getAllTrips(){
    return this.http.get(allTripsUrl);
  }

  addTrip(tripInfo: any){
    return this.http.post(addTripUrl, tripInfo);
  }

  deleteTrip(ID: any){

  }

  findTrip(name: any){

  }

  findTripByEmail(email: any){
    return this.http.get(yourTripsUrl + "/" + email);
  }
}
