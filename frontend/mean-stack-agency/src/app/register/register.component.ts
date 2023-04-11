import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserClass } from '../models/user.class';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  submitted = false

  registerForm!: FormGroup;
  user = new UserClass()

  constructor(private authService: AuthService) {console.info('AuthCallbackComponent'); }

  ngOnInit(): void {
    this.buildFormControls()
  }
  
  // build form controls
  buildFormControls(){
    this.registerForm = new FormGroup({
      firstname : new FormControl('',[Validators.required, Validators.minLength(2)]),
      lastname : new FormControl('',[Validators.required, Validators.minLength(2)]),
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required, Validators.minLength(2)]),
      repeatPassword : new FormControl('',[Validators.required, Validators.minLength(2)]),      
    })
  }

  handleSubmit(){
    this.buildUser()
    this.authService.registerNewUser(this.user)
    .subscribe({
      next: () => {
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

  // build new user object
  buildUser(){
    let u = this.registerForm.value
    this.user.firstname = u.firstname
    this.user.lastname = u.lastname
    this.user.email = u.email
    this.user.password = u.password
  }

}
