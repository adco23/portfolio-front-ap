import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private backendURL: string = `${environment.apiUrl}/api/v1/projects`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.backendURL}/user/1`);
  }

  addProject(project: Project): Observable<any> {
    return this.httpClient.post(`${this.backendURL}/user/1`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.httpClient.delete(`${this.backendURL}/project/${id}`);
  }

  editProject(id: number, project: Project): Observable<any> {
    return this.httpClient.put(`${this.backendURL}/user/1/proj/${id}`, project);
  }
}
