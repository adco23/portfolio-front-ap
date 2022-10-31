import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private backendURL: string = `${environment.apiUrl}/api/v1/education`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getEducation(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(`${this.backendURL}/user/1`);
  }

  addEducation(education: Education): Observable<any> {
    return this.httpClient.post(`${this.backendURL}/user/1`, education);
  }

  deleteEducation(id: number): Observable<any> {
    return this.httpClient.delete(`${this.backendURL}/edu/${id}`);
  }

  editEducation(id: number, education: Education): Observable<any> {
    return this.httpClient.put(`${this.backendURL}/user/1/edu/${id}`, education);
  }
}
