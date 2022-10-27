import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'app-skill-chips',
  templateUrl: './skill-chips.component.html',
  styleUrls: ['./skill-chips.component.css']
})
export class SkillChipsComponent implements OnInit {

  @Input() skill: Skill;
  text: string;

  constructor() { }

  ngOnInit(): void {
    this.changeText();
  }

  changeText (): void {
    let lvl = this.skill.type === 'language' ? ` - ${this.skill.level}` : '';

    this.text = this.skill.name + lvl;
  };

}
