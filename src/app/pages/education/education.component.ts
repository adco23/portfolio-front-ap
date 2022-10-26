import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educationList: Education[] = [];
  educationForm: FormGroup;
  toEditId: number;
  submitted: boolean = false;
  showModal: boolean = false;
  modal_config = {
    type: '',
    title: '',
    btnText: ''
  };
  alert_config = {
    show: false,
    message: '',
    type: ''
  }

  constructor(
    private educationService: EducationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getEducation();

    this.educationForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
      institute: ['', [Validators.maxLength(100), Validators.minLength(3)]],
      description: [null, Validators.maxLength(1500)],
      // start_date: [''],
      start_year: [null, Validators.required],
      start_month: [null],
      // finish_date: [''],
      finish_year: [null],
      finish_month: [null],
    }, {
      validator: this.finishDate()
    });
  }

  private getEducation(): void {
    this.educationService.getEducation().subscribe(data => this.educationList = [...data]);
  };

  private addEducation(): void {
    if (this.submitted) {
      try {
        this.educationService.addEducation(this.educationForm.value)
        .subscribe(data => {
          this.toggleAlert(data.message, 'success');
          this.getEducation();
        })
      } catch (error: any) {
        this.toggleAlert(error, 'danger');
        console.log('\x1b[31mAdd education error: \x1b[0m', error);
      }
    }
  };

  private deleteEducation(id: number): void {
    try {
      this.educationService.deleteEducation(id)
        .subscribe( data => {
          this.toggleAlert(data.message, 'success');
          this.getEducation();
        });
    } catch (error: any) {
      this.toggleAlert(error, 'danger');
      console.log('\x1b[31mDelete education error: \x1b[0m', error);
    }
  };

  private editEducation(): void {
    try {
      this.educationService.editEducation(this.toEditId, this.educationForm.value)
        .subscribe(data => {
          this.toggleAlert(data.message, 'success');
          this.getEducation();
        });
    } catch (error: any) {
      this.toggleAlert(error, 'danger');
      console.log('\x1b[31mEdit education error: \x1b[0m', error);
    }
  };

  private finishDate() {
    return (formGroup: FormGroup) => {
      let control_year = formGroup.controls['start_year'];
      let control_month = formGroup.controls['start_month'];
      let matching_year = formGroup.controls['finish_year'];
      let matching_month = formGroup.controls['finish_month'];

      if (matching_month.errors && !matching_month.errors['greaterThan'] && matching_year.errors && !matching_year.errors['greaterThan']) return

      if (control_year.value > matching_year.value) {
        matching_year.setErrors({ greaterThan: true });
      } else if (control_year.value === matching_year.value && control_month.value > matching_month.value) {
        matching_month.setErrors({ greaterThan: true });
        matching_year.setErrors(null);
      } else {
        matching_month.setErrors(null);
        matching_year.setErrors(null);

      }

      // if (matching.errors && !matching.errors["greaterThan"]) return

      // if (control.value > matching.value) {
      //   matching.setErrors({ greaterThan: true});
      // } else {
      //   matching.setErrors(null);
      // }
    };
  };

  get form(): any {
    return this.educationForm.controls;
  };

  openModal(type: string): void {
    this.modal_config = {
      type: type,
      title: type === 'add' ? 'Agregar Educación' : 'Editar educación',
      btnText: type === 'add' ? 'Agregar' : 'Editar',
    }
    this.showModal = true;
  };

  closeModal(): void {
    this.showModal = false;

    this.modal_config = {
      type: '',
      title: '',
      btnText: '',
    }
  }

  deleteItem(e: any){
    this.deleteEducation(e);
    // console.log('\x1b[33mDelete item: \x1b[0m', e);
  };

  editItem(id: any){
    console.log('\x1b[33mEdit item: \x1b[0m', id);
    let edu = this.educationList.find(edu => edu.id === id);

    this.toEditId = id;

    this.educationForm.controls["title"].setValue(edu?.title);
    this.educationForm.controls["institute"].setValue(edu?.institute);
    this.educationForm.controls["description"].setValue(edu?.description);
    this.educationForm.controls["finish_year"].setValue(edu?.finish_year);
    this.educationForm.controls["finish_month"].setValue(edu?.finish_month);
    this.educationForm.controls["start_year"].setValue(edu?.start_year);
    this.educationForm.controls["start_month"].setValue(edu?.start_month);

    // this.openDialog('edit');
    this.openModal('edit');
  };

  getSelectedDate(type: string, e: any){
    if (type === 'start') {
      this.form.start_year.setValue(e.year);
      this.form.start_month.setValue(e.month);
    }
    if (type === 'finish') {
      this.form.finish_year.setValue(e.year);
      this.form.finish_month.setValue(e.month);
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
    this.educationForm.reset();
    this.closeModal();
  };

  onSubmit(): void {
    if (this.educationForm.invalid) return;

    this.submitted = true;

    this.modal_config.type === 'add' ?
      this.addEducation() :
      this.editEducation();

    this.onReset();
  };

}
