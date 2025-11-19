import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  userCarrerasMaterias(): Observable<any> {
    return this.http.get(`${this.apiUrl}userCarrerasMaterias`);
  }
}
