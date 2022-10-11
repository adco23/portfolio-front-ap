import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService {

  // private backendURL: string = 'http://localhost:8080/api/v1/experience';
  private backendURL: string = `${environment.apiUrl}/api/v1/experience`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getExperience(): Observable<Experience[]> {
    return this.httpClient.get<Experience[]>(`${this.backendURL}/user/1`);
  }

  addExperience(experience: Experience): Observable<any> {
    return this.httpClient.post(`${this.backendURL}/user/1`, experience);
  }

  deleteExperience(id: number): Observable<any> {
    return this.httpClient.delete(`${this.backendURL}/exp/${id}`);
  }

  editExperience(id: number, experience: Experience): Observable<any> {
    return this.httpClient.put(`${this.backendURL}/user/1/exp/${id}`, experience);
  }
}
