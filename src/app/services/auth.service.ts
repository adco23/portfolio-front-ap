import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { JwtDto } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import { NewUser } from '../models/new-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL: string = `${environment.apiUrl}/auth/`;
  // authURL: string = `http://localhost:8080/auth`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public create(newUser: NewUser): Observable<any> {
    return this.httpClient.post<any>( `${this.authURL}/new`, newUser );
  };

  public login(user: LoginUser): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>( `${this.authURL}/login`, user );
  };
}
