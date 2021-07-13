import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css']
})
export class EditUserDetailsComponent implements OnInit {
  currentUser: string = '';
  newName: string = '';
  newEmail: string = ''; 
  newPhone: string = '';

  constructor(private user: UserService) {
   }

  ngOnInit(): void {
  }

  updateUser(){
    //Registers new user using data from html form
    let updatedUser = {
      email: this.newEmail,
      name: this.newName ,
      phone: this.newPhone
    }
    
    console.log(updatedUser.email, updatedUser.name, updatedUser.phone)
    this.user.updateDetails(updatedUser).subscribe(
      (response=> {
        console.log("user was edited")
      }
    ));
  }



}
