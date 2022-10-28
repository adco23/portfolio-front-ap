import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from 'src/app/models/skill';
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

}
