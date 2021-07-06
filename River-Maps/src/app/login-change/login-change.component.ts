import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-change',
  templateUrl: './login-change.component.html',
  styleUrls: ['./login-change.component.css']
})
export class LoginChangeComponent implements OnInit {

  currentPass: string ='';
  newPass: string ='';
  newPassCheck: string = '';

  constructor(private user: UserService) { }

  ngOnInit(): void {
  }

  updateUser(){
    console.log(this.currentPass, this.newPass, this.newPassCheck);
    //Registers new user using data from html form
    // let updatedUser = {
    //   email: this.currentPass,
    //   name: this.currentPass,
    //   phone: this.currentPass
    // }
    
    // this.user.updateDetails(updatedUser).subscribe(
    //   (response=> {
    //     console.log("user was edited")
    //   }
    // ));
  }

}
