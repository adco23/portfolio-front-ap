import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill, skill_types } from 'src/app/models/skill';
import { SkillsService } from 'src/app/services/skills.service';
import { ValidateExists } from 'src/app/validators/exists.validator';

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
  toEditId: number;

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
      name: ['', [Validators.required]],
      level: [null],
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
      let value = this.skillForm.controls['name'].value;
      let exists = this.skills.map(item => item.name.toLowerCase()).includes(value.toLowerCase());

      if (exists) throw new Error('Ya existe');

      this.skillService.addSkill(this.skillForm.value)
        .subscribe(data => {
          this.toggleAlert(data.message, 'success');
          this.getSkills();
        })

      } catch (error: any) {
      this.toggleAlert(error, 'danger');
      console.error('\x1b[31mAdd skill error: \x1b[0m', error);
    }
  };

  private deleteSkill(id: number): void {
    try {
      this.skillService.deleteSkill(id)
        .subscribe(data => {
          this.toggleAlert(data.message, 'success');
          this.getSkills();
        });
    } catch (error: any) {
      this.toggleAlert(error, 'danger');
      console.log('\x1b[31mDelete skill error: \x1b[0m', error);
    }
  };

  private editSkill(): void {
    try {
      this.skillService.editSkills(this.toEditId, this.skillForm.value)
        .subscribe(data => {
          this.toggleAlert(data.message, 'success');
          this.getSkills();
        });
    } catch (error: any) {
      this.toggleAlert(error, 'danger');
      console.log('\x1b[31mEdit skill error: \x1b[0m', error);
    }
  };

  private exists(): any {
    return (formGroup: FormGroup) => {
      let newSkill = formGroup.controls['name'];
      let list = this.skills.map(item => item.name.toLowerCase());

      if (newSkill.errors && !newSkill.errors['exists']) return;

      if (list.includes(newSkill.value.toLowerCase())) {
        newSkill.setErrors({ exists: true });
      } else {
        newSkill.setErrors(null);
      }
    };
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

  deleteItem(id: any) {
    this.deleteSkill(id);
  };

  editItem(skill: any) {
    this.toEditId = skill.id;

    this.skillForm.controls['name'].setValue(skill.name);
    this.skillForm.controls['type'].setValue(skill.type);
    this.skillForm.controls['level'].setValue(skill.level);

    this.openModal('edit');
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
      this.editSkill();

    this.onReset();
  };

}
