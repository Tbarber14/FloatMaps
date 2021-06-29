import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  currentUserEmail!: String;
  isCollapsedDetails:boolean = true;
  isCollapsedPass:boolean = true;

  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit(): void {
        // Checks if the user is logged in
        if(this.auth.retrieveUser() == null){
          this.router.navigate(['/login']);
        }

        this.currentUserEmail = this.auth.retrieveUser().email;
  }
}
