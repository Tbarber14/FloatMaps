import { Component, OnInit } from '@angular/core';
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

  constructor(private auth:AuthService, private trips: UserTripsService) {
    this.email = this.auth.retrieveUser().email;
   }

  ngOnInit(): void {

    this.trips.findTripByEmail(this.email).subscribe(trips => { 
      this.tripInfo = trips as unknown as Trip[]
    })
  }

  sendToMap(){
      
  }
}
