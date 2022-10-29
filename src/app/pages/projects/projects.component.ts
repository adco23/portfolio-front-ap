import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];

  status = {
    isLoaded: false,
    isEmpty: true,
  };
  modal_config = {
    show: false,
    type: '',
    title: '',
    btnText: ''
  };

  constructor(
    private projectService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  private getProjects(): void {
    try {
      this.projectService.getProjects()
        .subscribe(data => {
          this.projects = data;
          this.status = {
            isLoaded: true,
            isEmpty: data.length === 0 ? true : false
          }
        })
    } catch (error) {
      console.error(error);
    }
  };
}
