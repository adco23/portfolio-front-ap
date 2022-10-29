import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { faLink, faTrash, faPencil, } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  icon = {
    link: faLink,
    pencil: faPencil,
    trash: faTrash
  }

  @Input() project: Project;
  show_description: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
