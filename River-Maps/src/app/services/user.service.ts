import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthService } from './auth.service';

// If in docker url should be server instead of localhost
const loginUrl = 'http://localhost:3000/Admin/login'
const registerUrl = 'http://localhost:3000/Admin/register'
const detailsUrl = 'http://localhost:3000/Admin/updateDetails'
const passUrl = 'http://localhost:3000/Admin/updatePass'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: string = "";

  constructor(private http: HttpClient, private auth: AuthService) {

    if(this.auth.retrieveUser() != null){
      this.currentUser = this.auth.retrieveUser().email
    }
    
   }

  login(creds: any) {
    return this.http.post(loginUrl, creds)
  }

  logout() {

  }

  register(data: any) {
    console.log(data);
    return this.http.post(registerUrl, data)
  }

  updateDetails(data: any){
    console.log(data);
    return this.http.put(detailsUrl + '/' + this.currentUser, data)
  }

  updatePassword(data: any){
    console.log(data);
    return this.http.put(passUrl, data)
  }

  getUser() {

  }
}