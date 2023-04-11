import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentialsClass } from '../models/logincred.class';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  submitted = false
  loginForm!: FormGroup;
  userCred = new LoginCredentialsClass()
  constructor(private authService: AuthService, public route:Router) {
    console.info('AuthCallbackComponent')
   
  }

  ngOnInit(): void {
    this.buildFormControls()
  }

  handleSubmit(){
   
    this.buildUserCredential()
    this.authService.userLogin(this.userCred)
        .subscribe({
          next: (data) => {
            if (data){
              console.log(data.token)
              this.authService.getUserProfile(data.token)
                  .subscribe({
                    next: (data) => {
                      console.log(data)
                      this.authService.setToken(data.token)
                      this.authService.setIsLoggedIn(true)
                      this.authService.setRedirectUrl('profile')
                      this.route.navigate(['profile'])
                    },
                    error: err => {
                      console.log('error:', err)
                      this.submitted = false
                    },
                    complete: () => {
                      console.log('the end')
                    }
                  })
            }
            this.submitted = true;
          },
          error: err => {
            console.log('error:', err)
            this.submitted = false
          },
          complete: () => {
            console.log('the end')
          }
        })
  }

  // build userCred
  buildUserCredential() {
    let uc = this.loginForm.value
    this.userCred.email = uc.email
    this.userCred.password = uc.password
  }

  // build form controls
  buildFormControls(){
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required, Validators.minLength(2)]),
    })
  }



}