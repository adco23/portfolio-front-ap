import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from 'src/app/models/experience';
import { ExperiencesService } from 'src/app/services/experiences.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  experiences: Experience[] = [];
  experienceForm: FormGroup;
  experienceToEditId: number;
  submitted: boolean = false;
  dialog_config = {
    title: '',
    type: '',
    btnText: ''
  }
  dialog_title: string;
  dialog_type: string;
  alert_config = {
    message: '',
    show: false,
    type: '',
  }
  isLoaded: boolean = false;

  constructor(
    private experienceService: ExperiencesService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getExperiences();

    this.experienceForm = this.formBuilder.group({
      position: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
      company: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', Validators.maxLength(1500)],
      company_img: [''],
      start_date: ['', Validators.required],
      finish_date: [''],
    });

    // this.openDialog();

  }

  private getExperiences(): void {
    this.experienceService.getExperience().subscribe(data => {
      this.experiences = [...data]
      this.isLoaded = true;
    });
  }

  private addExperience() {
    if (this.submitted) {
      try {

        this.experienceService.addExperience(this.experienceForm.value)
        .subscribe(data => {
          this.toggleAlert(data.message, 'success');
          this.getExperiences();
        })
      } catch (error: any) {
        this.toggleAlert(error, 'danger');
        console.log('\x1b[31mAdd experience error: \x1b[0m', error);
      }
    }
  }

  private deleteExperience(id: number) {
    try {
      this.experienceService.deleteExperience(id)
        .subscribe(data => {
          this.toggleAlert(data.message, 'success');
          this.getExperiences();
        });
    } catch (error: any) {
      this.toggleAlert(error, 'danger');
      console.log('\x1b[31mDelete experience error: \x1b[0m', error);
    }
  }

  private editExperience(){
    try {
      this.experienceService.editExperience(this.experienceToEditId, this.experienceForm.value)
        .subscribe(data => {
          this.toggleAlert(data.message, 'success');
          this.getExperiences();
        });
    } catch (error: any) {
      this.toggleAlert(error, 'danger');
      console.log('\x1b[31mEdit experience error: \x1b[0m', error);
    }
  }

  toggleAlert(message: string, type: string){
    this.alert_config = {
      show: true,
      message,
      type
    }

    setTimeout(() => {
      this.alert_config.show = false
    }, 3000);
  }

  openDialog(type: string){
    this.dialog_type = type;
    this.dialog_title = type === 'add' ? 'Añadir' : 'Editar';
    this.dialog_config = {
      title: type === 'add' ? 'Añadir' : 'Editar',
      type: type,
      btnText: type === 'add' ? 'Añadir' : 'Editar',
    }
    document.querySelector('dialog')?.showModal();
  }

  closeDialog(){
    document.querySelector('dialog')?.close();
  }

  get form(): any {
    return this.experienceForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.experienceForm.reset();
    this.closeDialog();
  }

  onSubmit(): void {
    if (this.experienceForm.invalid) return;

    this.submitted = true;

    if (this.dialog_type === 'add') {
      this.addExperience();
    }

    if (this.dialog_type === 'edit') {
      this.editExperience();
    }

    this.onReset();
  }

  deleteItem(e: any){
    this.deleteExperience(e);
  }

  editItem(id: any){
    // console.log('\x1b[33mEdit item: \x1b[0m', id);
    let exp = this.experiences.find(exp => exp.id === id);

    this.experienceToEditId = id;

    this.experienceForm.controls["company"].setValue(exp?.company);
    this.experienceForm.controls["company_img"].setValue(exp?.company_img);
    this.experienceForm.controls["description"].setValue(exp?.description);
    this.experienceForm.controls["finish_date"].setValue(exp?.finish_date);
    this.experienceForm.controls["start_date"].setValue(exp?.start_date);
    this.experienceForm.controls["position"].setValue(exp?.position);

    this.openDialog('edit');
  }

}
