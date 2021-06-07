import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, private user: UserService) { }

  usersName: string = '';
  email: string = ''; 
  password: string = '';
  confirmPassword: string ='';

  ngOnInit(): void {
  }

  createUser(){
    //Registers new user using data from html form
    let newAdmin = {
      email: this.email,
      name: this.usersName,
      username: this.email,
      password: this.password
    }
    
    this.user.register(newAdmin).subscribe(
      (response=> {
        console.log("user was added")
      }
    ));

    // Registers new user with Authentication system.
    this.auth.registerUser();
    
    this.router.navigate(['./login']);
  }

}