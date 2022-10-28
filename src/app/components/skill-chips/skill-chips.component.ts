import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'app-skill-chips',
  templateUrl: './skill-chips.component.html',
  styleUrls: ['./skill-chips.component.css']
})
export class SkillChipsComponent implements OnInit {

  text: string;
  @Input() skill: Skill;
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() editEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.changeText();
  }

  changeText (): void {
    let lvl = this.skill.type === 'language' ? ` - ${this.skill.level}` : '';

    this.text = this.skill.name + lvl;
  };

  delete(): void {
    this.deleteEvent.emit(this.skill.id);
  };

  edit(): void {
    this.editEvent.emit(this.skill.id);
  };

}
