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
  skillForm: FormGroup;
  skillTypes: string[] = Object.values(skill_types);
  submitted: boolean = false;

  status = {
    isLoaded: false,
    isEmpty: true,
  };
  modal_config = {
    show: false,
    type: '',
    btnText: '',
    title: ''
  };
  alert_config = {
    show: false,
    message: '',
    type: ''
  };

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

  private addSkill(): void {
    try {
      this.skillService.addSkill(this.skillForm.value)
        .subscribe(data => {
          this.toggleAlert(data.message, 'success');
          this.getSkills();
        })
      } catch (error: any) {
      this.toggleAlert(error, 'danger');
      console.log('\x1b[31mAdd skill error: \x1b[0m', error);
    }
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

  onReset(): void {
    this.submitted = false;
    this.skillForm.reset();
    this.closeModal();
  };

  onSubmit(): void {
    if (this.skillForm.invalid) return;

    this.submitted = true;

    this.modal_config.type === 'add' ?
      this.addSkill() :
      console.log('🔥edit: ', this.skillForm.value);

    this.onReset();
  };

}
