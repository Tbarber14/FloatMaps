import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from 'src/models/Trip';

const allTripsUrl = 'http://localhost:3000/Trips/getTrips'
const addTripUrl = 'http://localhost:3000/Trips/addTrips'
const yourTripsUrl = 'http://localhost:3000/Trips/yourTrips'
const deleteTripUrl = 'http://localhost:3000/Trips/delete'
const updateTripUrl = 'http://localhost:3000/Trips/updateTrip'

@Injectable({
  providedIn: 'root'
})
export class UserTripsService {

  allMarkers: [number, number][] =[];
  trip!: any;
  distance!: number;
  editTrip:boolean = false;

  constructor(private http: HttpClient) { }

  getTripCache(){
    return this.trip;
  }

  cacheTrip(trip: any){
    this.trip = trip;
  }

  clearTripCache(){
    this.trip = null;
  }

  getAllTrips(){
    return this.http.get(allTripsUrl);
  }

  addTrip(tripInfo: any){
    return this.http.post(addTripUrl, tripInfo);
  }

  deleteTrip(ID: any){
    return this.http.delete(deleteTripUrl + "/" + ID);
  }

  findTripByEmail(email: any){
    return this.http.get(yourTripsUrl + "/" + email);
  }

  updateTrip(trip: Trip){
    return this.http.put(updateTripUrl + "/" + trip._id, trip);
  }
}
