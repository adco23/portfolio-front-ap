import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  // private backendURL: string = 'http://localhost:8080/api/v1/users/user/1';
  private backendURL: string = `${environment.apiUrl}/api/v1/users/user/1`;

  constructor(
    private httpClient: HttpClient
  ) {}

  getUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.backendURL}`);
  }

  editUser(user: User): Observable<any> {
    return this.httpClient.put(this.backendURL, user)
  }
}
