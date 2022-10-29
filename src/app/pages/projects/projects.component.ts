import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];
  projectForm: FormGroup;

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
    private projectService: ProjectsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getProjects();

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
          this.status = {
            isLoaded: true,
            isEmpty: data.length === 0 ? true : false
          }
        })
    } catch (error) {
      console.error(error);
    }
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

    console.log('onSubmit')
    console.log(this.projectForm.value)
  };
}
