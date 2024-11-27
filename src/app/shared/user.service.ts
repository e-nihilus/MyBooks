import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';  

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'http://localhost:3000'; 

  public logueado: boolean = false;
  public user: User | null = null;
  public id_user: number | null = null;

  constructor(private http: HttpClient) { }

  public register(user: User) {
    return this.http.post(`${this.url}/registro`, user);
  }

  public login(user: User) {
    return this.http.post(`${this.url}/login`, user);
  }

  public modUser(user: User) {
    return this.http.put(`${this.url}/user`, user);
  }
  
}

