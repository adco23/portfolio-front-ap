import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  user: User = {};

  aboutForm: FormGroup;
  submitted: boolean = false;
  showModal: boolean = false;

  text: string;
  count: number;

  msgAlert: string;
  showAlert: boolean = false;
  typeAlert: string;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUser();

    this.aboutForm = this.formBuilder.group({
      about: ['', Validators.maxLength(1500)],
    });

    this.onChange();
  }

  private getUser() {
    this.userService.getUser().subscribe((data) => {
      this.user = data;
      this.text = !data.about ? 'Escribe algo sobre vos...' : data.about;
      this.count = !data.about
        ? 'Escribe algo sobre vos...'.length
        : data.about.length;
    });
  }

  private putAbout() {
    let changedUser = {
      ...this.user,
      about: this.text,
    };

    this.userService.editUser(changedUser).subscribe({
      next: data => this.toggleAlert(data.message, 'success'),
      error: error => this.toggleAlert('Se produjo un error', 'danger')
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  get form() {
    return this.aboutForm.controls;
  }

  toggleAlert(message: string, type: string) {
    this.showAlert = true;

    this.msgAlert = message;

    this.typeAlert = type;

    setTimeout(() => this.showAlert = false, 3000);
  }

  onChange(): void {
    this.aboutForm.valueChanges.subscribe((val) => {
      this.text = val.about.length === 0 ? this.user.about : val.about;
      this.count = this.text.length;
    });
  }

  onSubmit(): void {
    if (this.aboutForm.invalid) {
      return;
    }

    if (this.user.about === this.text) {
      this.toggleAlert('Escribe algo...', 'info');
    } else {
      this.putAbout();

      this.toggleModal();

      this.submitted = true;

      this.getUser();
    }
  }

  onReset(): void {
    this.submitted = false;

    this.toggleModal();
  }
}
