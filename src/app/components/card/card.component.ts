import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Experience } from 'src/app/models/experience';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() experience: Experience;
  options: string[] = ['Editar', 'Eliminar'];
  showMore: boolean = false;
  isShort: boolean;
  limit: number = 150;
  empty_img: string = 'https://i.pinimg.com/564x/ba/68/70/ba68702ea92ebceec8de6e1f16e35c6e.jpg';

  @Output() delete_action = new EventEmitter<any>();
  @Output() edit_action = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.experience;
    this.isShort = this.experience.description?.length <= this.limit ? true : false;
  }

  onShow () {
    this.showMore = !this.showMore;
  }

  deleteClick() {
    this.delete_action.emit(this.experience.id);
  }

  editClick() {
    this.edit_action.emit(this.experience.id);
  }

}
