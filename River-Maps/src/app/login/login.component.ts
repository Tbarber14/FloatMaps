import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userFormGroup: FormGroup | undefined;

  userName: string = '';
  passwordCredentials: string = '';
  error: boolean = false;
  registered: boolean = false;
  
  constructor(private router: Router, private userservice: UserService, private auth: AuthService) { }


  ngOnInit(): void {
    this.registered = this.auth.registered;

    this.userFormGroup = new FormGroup({
      userName: new FormControl('', [Validators.required, 
                                      Validators.minLength(2), 
                                      Validators.maxLength(10)]),
      userContact: new FormControl()
    })
    
  }


  handleSubmit() {
    this.auth.clearRegister();
    this.registered = this.auth.registered;
    let loginAdmin = {
     
      username: this.userName,
      password: this.passwordCredentials
    }
    this.userservice.login(loginAdmin)
      .subscribe(user => {
        this.auth.storeUser(user);
        this.router.navigate(['./map']);
      }, err => {
        if(err){
          this.error = true;
          console.log(err);
        }
      })
  }

}