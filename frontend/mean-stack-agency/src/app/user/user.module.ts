import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, FormsModule
  ],
  exports: [LoginComponent, RegisterComponent, ProfileComponent]
})
export class UserModule { }
