import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];
  projectForm: FormGroup;
  idToEdit: number;

  status = {
    isLoaded: false,
    isEmpty: true,
    isAuthorized: false,
  };
  modal_config = {
    show: false,
    type: '',
    title: '',
    btnText: ''
  };
  alert_config = {
    show: false,
    type: '',
    message: ''
  };

  constructor(
    private projectService: ProjectsService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getProjects();

    this.getAuthorities();

    this.projectForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [null, Validators.maxLength(150)],
      img: null,
      link: null
    });
  }

  private getProjects(): void {
    try {
      this.projectService.getProjects()
        .subscribe(data => {
          this.projects = data;
          this.status.isLoaded = true;
          this.status.isEmpty = data.length === 0 ? true : false;
        })
    } catch (error: any) {
      this.toggleAlert(error, 'danger');
      console.error('\x1b[31mGet project error: \x1b[0m', error);
    }
  };

  private addProject(): void {
    try {
      this.projectService.addProject(this.projectForm.value)
        .subscribe(data => {
          this.toggleAlert(data.message, 'success');
          this.getProjects();
        });
      } catch (error: any) {
        this.toggleAlert(error, 'danger');
        console.error('\x1b[31mAdd project error: \x1b[0m', error);
      }
    };

  private deleteProject(id: number): void {
      try {
        this.projectService.deleteProject(id)
          .subscribe(data => {
          this.toggleAlert(data.message, 'success');
          this.getProjects();
        })
    } catch (error: any) {
      this.toggleAlert(error, 'danger');
      console.error('\x1b[31mDelete project error: \x1b[0m', error);
    }
  };

  private editProject(): void {
    try {
      this.projectService.editProject(this.idToEdit, this.projectForm.value)
        .subscribe(data => {
          this.toggleAlert(data.message, 'success');
          this.getProjects();
        })
    } catch (error: any) {
      this.toggleAlert(error, 'danger');
      console.error('\x1b[31mEdit project error: \x1b[0m', error);
    }
  };

  private getAuthorities() {
    let auth = this.tokenService.getAuthorities();

    this.status.isAuthorized = auth &&
      auth.map(item => item.authority).includes('ROLE_ADMIN') ? true : false;
  };

  get form(): any {
    return this.projectForm.controls
  };

  openModal(type: string): void {
    this.modal_config = {
      type,
      show: true,
      title: type === 'add' ? 'Agregar proyecto' : 'Editar proyecto',
      btnText: type === 'add' ? 'Agregar' : 'Editar',
    }
  };

  closeModal(): void {
    this.modal_config = {
      show: false,
      type: '',
      title: '',
      btnText: '',
    }
  };

  onReset(): void {
    this.projectForm.reset();

    this.closeModal();
  };

  onSubmit(): void {
    if (this.projectForm.invalid) return;

    this.modal_config.type === 'add'
      ? this.addProject()
      : this.editProject();

    this.onReset();
  };

  deleteItem(id: number): void {
    this.deleteProject(id);
  };

  editItem(project: any): void {
    let keys = Object.keys(project);

    this.idToEdit = project.id;

    keys.forEach(key => key !== 'id' ? this.projectForm.controls[key].setValue(project[key]) : false);

    this.openModal('edit');
  };

  toggleAlert(message: string, type: string){
    this.alert_config = {
      show: true,
      message,
      type
    }

    setTimeout(() => {
      this.alert_config.show = false
    }, 3000);
  };
}
