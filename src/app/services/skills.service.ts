import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private backendURL: string = `${environment.apiUrl}/api/v1/skills`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getSkills(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(`${this.backendURL}/user/1`);
  }

  addSkill(skill: Skill): Observable<any> {
    return this.httpClient.post(`${this.backendURL}/user/1`, skill);
  }

  deleteSkill(id: number): Observable<any> {
    return this.httpClient.delete(`${this.backendURL}/skill/${id}`);
  }

  editSkills(id: number, skill: Skill): Observable<any> {
    return this.httpClient.put(`${this.backendURL}/user/1/skill/${id}`, skill);
  }
}
