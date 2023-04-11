import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentialsClass } from '../models/logincred.class';
import { UserClass } from '../models/user.class';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // Endpoint to our express app..
  authUrl = environment.authUrl;
  signup = environment.signup;
  login = environment.login;

  private isLoggedIn!: boolean;

  // store the URL so we can redirect after logging in
  private redirectUrl!: string;
  jwtHelper = new JwtHelperService();
  

  constructor(private http: HttpClient) { 

  }

  // POST - New user registeration 
  registerNewUser(newUser: UserClass) : Observable<any> {
    return this.http.post(this.authUrl+this.signup, newUser) 
  }

  // POST - login the user 
  userLogin(userCred: LoginCredentialsClass) : Observable<any> {
    return this.http.post(this.authUrl+this.login, userCred)
  }

  // middleware to check if the user is LoggedIn
  CheckIfUserIsloggedIn(): boolean {
    return this.getIsLoggedIn()
  }

  // log the user out
  logout(): void {
    this.setIsLoggedIn(false)
  }

  // Get - user profile  
  getUserProfile(token: string) : Observable<any> {
    return this.http.get(this.authUrl + 'user/profile?secret_token=' + token) 
  }

  setIsLoggedIn(opt: boolean){
    this.isLoggedIn = opt
  }

  getIsLoggedIn(): boolean{
    return this.isLoggedIn;
  }

  // get redirectUrl
  getRedirectUrl(): string | null {
    return this.redirectUrl || 'login';
  }

  // set redirectUrl
  setRedirectUrl(url: string | null){
    this.redirectUrl = url || 'login'
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token')
    console.log("This is :" + token)
    // check for token expiration status
    console.log("checking Authentication methods")
    return !this.jwtHelper.isTokenExpired(token!)
  }

  setToken(token: string){
    localStorage.setItem('access_token', token)
    console.log("token is saved ")
  }

}
// res.redirect(`/user/profile?secret_token=${token}`)