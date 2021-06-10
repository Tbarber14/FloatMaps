import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from 'src/models/Trip';
import { AuthService } from '../services/auth.service';
import { UserTripsService } from '../services/user-trips.service';

@Component({
  selector: 'app-save-map',
  templateUrl: './save-map.component.html',
  styleUrls: ['./save-map.component.css']
})
export class SaveMapComponent implements OnInit {
  tripFormGroup: FormGroup | undefined;

  email: string = '';
  title: string = "";
  description: string = "";
  image: string = "";
  trip!: Trip;
  
  constructor(private router: Router, private auth: AuthService, private tripService: UserTripsService) {
    this.trip = tripService.getTripCache();
    this.email = this.auth.retrieveUser().email;
   }


  ngOnInit(): void {
    this.tripFormGroup = new FormGroup({
      userName: new FormControl('', [Validators.required, 
                                      Validators.minLength(2), 
                                      Validators.maxLength(10)]),
      userContact: new FormControl()
    })
    
  }


  handleSubmit() {

    this.tripService.addTrip(this.trip)
      .subscribe(user => {
        this.router.navigate(['./map']);
      }, err => {
        if(err){
          console.log(err);
        }
      })
  }

}