import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  constructor(protected authService: AuthService, private route:Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()){
      this.authService.setIsLoggedIn(false)
      this.route.navigate(['login'])
    }else{
      this.authService.setIsLoggedIn(true)
    }
  }
}