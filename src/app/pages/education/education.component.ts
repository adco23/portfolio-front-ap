import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educationList: Education[] = [];

  constructor(
    private educationService: EducationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getEducation();
  }

  private getEducation(): void {
    this.educationService.getEducation().subscribe(data => this.educationList = [...data])
  }

}
