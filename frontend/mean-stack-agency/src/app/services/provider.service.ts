import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProviderClass } from '../models/providers.class';

@Injectable({
  providedIn: 'root'
})

export class ProviderService {
  // Endpoint to our express app..
  apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }

  // GET all records
  getProviders() : Observable<any>{
    return this.http.get(this.apiURL)
  }

  // GET one record
  getProvider(id: any) : Observable<any>{
    return this.http.get(this.apiURL + id)
  }
  
  // PUT - update a record
  updateProvider(id: any, newProvider: ProviderClass): Observable<ProviderClass>{
    return this.http.put<ProviderClass>(this.apiURL + id, newProvider)
  }

  // POST - add a new record
  addProvider(newProvider: ProviderClass) : Observable<any> {
    return this.http.post(this.apiURL, newProvider) 
  }

  // DELETE - delete one record
  deleteProvider(id: any): Observable<any>{
    return this.http.delete<any>(this.apiURL + id)
  }

  /** DELETE: delete all records */
  deleteProviders(): Observable<any>{
    return this.http.delete<any>(this.apiURL)
  }

}