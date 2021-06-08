import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  allMarkers: [number, number][] =[];
  
  constructor(private router: Router, private auth: AuthService, private tripService: UserTripsService) {
    this.allMarkers = tripService.getMapCache();
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
    let tripInfo = {
     
      email: this.email,
      title: this.title,
      description: this.description,
      image: this.image,
      publishDate: new Date(),
      allMarkers: this.allMarkers,
    }

    console.log(tripInfo);

    this.tripService.addTrip(tripInfo)
      .subscribe(user => {
        this.auth.storeUser(user);
        this.router.navigate(['./map']);
      }, err => {
        if(err){
          console.log(err);
        }
      })
  }

}