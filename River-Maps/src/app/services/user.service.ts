import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

// If in docker url should be server instead of localhost
const loginUrl = 'http://localhost:3000/Admin/login'
const registerUrl = 'http://localhost:3000/Admin/register'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(creds: any) {
    return this.http.post(loginUrl, creds)
  }

  logout() {

  }

  register(data: any) {
    console.log(data);
    return this.http.post(registerUrl, data)
  }

  getUser() {

  }
}