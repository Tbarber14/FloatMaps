import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
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
  currentUser: string ='';

  constructor(private user: UserService, private auth: AuthService) {
    this.currentUser = auth.retrieveUser().email;
   }

  ngOnInit(): void {
  }

  updatePass(){
    console.log(this.currentPass, this.newPass, this.newPassCheck);
    // Registers new user using data from html form
    let updatedUserPass = {
      email: this.currentUser,
      password: this.currentPass,
      newPass: this.newPass
    }
    
    this.user.updatePassword(updatedUserPass).subscribe(
      (response=> {
        console.log("password was updated")
      }
    ));
  }

}
