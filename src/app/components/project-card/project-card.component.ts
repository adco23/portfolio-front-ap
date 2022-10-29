import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { faLink, faTrash, faPencil, } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: Project;
  show_description: boolean = false;
  default_img: string = 'https://i.pinimg.com/564x/6b/02/cd/6b02cd228d391a474a582d8510bf4be8.jpg';
  icon = {
    link: faLink,
    pencil: faPencil,
    trash: faTrash
  };


  constructor() { }

  ngOnInit(): void {
  }

}
