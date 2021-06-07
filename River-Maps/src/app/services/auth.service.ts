import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registered: boolean = false;

  constructor() { }

  storeUser(user: any){
      sessionStorage.setItem("user", JSON.stringify(user));
  }

  retrieveUser(){
      return JSON.parse(sessionStorage.getItem("user") || 'null');
  }

  removeUser(){
      sessionStorage.removeItem("user");
  }
  
  registerUser(){
    this.registered = true;
  }

  clearRegister(){
    this.registered = false;
  }
}