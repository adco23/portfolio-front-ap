import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill, skill_types } from 'src/app/models/skill';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skills: Skill[];
  status = {
    isLoaded: false,
    isEmpty: true,
  };
  skillForm: FormGroup;
  modal_config = {
    show: false,
    type: '',
    btnText: '',
    title: ''
  };
  skillTypes: string[] = Object.values(skill_types);
  submitted: boolean = false;

  constructor(
    private skillService: SkillsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getSkills();

    this.skillForm = this.formBuilder.group({
      name: ['', Validators.required],
      level: null,
      type: ['', Validators.required]
    })
  }

  private getSkills(): void {
    this.skillService.getSkills().subscribe(data => {
      this.skills = data;
      this.status.isLoaded = true;
      this.status.isEmpty = data.length === 0 ? true : false;
    });
  };

  get form(): any {
    return this.skillForm.controls;
  };

  openModal(type: string): void {
    this.modal_config = {
      type,
      show: true,
      title: type === 'add' ? 'Agregar habilidad' : 'Editar habilidad',
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
    this.submitted = false;
    this.skillForm.reset();
    this.closeModal();
  };

  onSubmit(): void {
    if (this.skillForm.invalid) return;

    this.submitted = true;

    this.modal_config.type === 'add' ?
      console.log('🔥add: ', this.skillForm.value) :
      console.log('🔥edit: ', this.skillForm.value);

    this.onReset();
  };

}
