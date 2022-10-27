import { Component, OnInit } from '@angular/core';
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
  }

  constructor(
    private skillService: SkillsService,
  ) { }

  ngOnInit(): void {
    this.getSkills();
  }

  private getSkills(): void {
    this.skillService.getSkills().subscribe(data => {
      this.skills = data;
      this.status.isLoaded = true;
      this.status.isEmpty = data.length === 0 ? true : false;
    });
  };

}
