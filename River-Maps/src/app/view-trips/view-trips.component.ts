import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from 'src/models/Trip';
import { AuthService } from '../services/auth.service';
import { UserTripsService } from '../services/user-trips.service';

@Component({
  selector: 'app-view-trips',
  templateUrl: './view-trips.component.html',
  styleUrls: ['./view-trips.component.css']
})
export class ViewTripsComponent implements OnInit {

  tripInfo: Trip[] = [];
  email = "";

  constructor(private auth:AuthService, private tripService: UserTripsService, private router: Router) {
    this.email = this.auth.retrieveUser().email;
 
   }

  ngOnInit(): void {

    this.tripService.findTripByEmail(this.email).subscribe(trips => { 
      this.tripInfo = trips as unknown as Trip[]
    })
  }

  viewDetails(trip: Trip){
    this.tripService.cacheTrip(trip);
  }

  deleteTrip(trip: Trip){
    this.tripService.deleteTrip(trip._id)
      .subscribe(trip => {
        window.location.reload();
      }, err => {
        if(err){
          console.log(err);
        }
      })
  }

  editTrip(trip: Trip){
    this.tripService.editTrip = true;
    this.tripService.cacheTrip(trip);
    this.router.navigate(['/map']);
  }

  calculateTimeEstimate(distance:any){
    let timeEstimateLow =  Math.round(distance / 1.6);
    let timeEstimateHigh = Math.round(timeEstimateLow + (timeEstimateLow / 2))  ;

    return [timeEstimateLow, timeEstimateHigh];
  }
}
