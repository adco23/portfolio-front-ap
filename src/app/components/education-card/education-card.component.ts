import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Education } from 'src/app/models/education';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'education-card',
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.css']
})
export class EducationCardComponent implements OnInit {

  @Input() education: Education;
  @Output() delete_action = new EventEmitter<any>();
  @Output() edit_action = new EventEmitter<any>();

  options: string[] = ['Editar', 'Eliminar'];

  start_date: string;
  finish_date: any;

  isAuthorized: boolean = false;

  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.education;

    this.start_date = this.dateFormat(this.education.start_year, this.education.start_month)
    this.finish_date = this.dateFormat(this.education.finish_year, this.education.finish_month)

    this.getAuthorities();
  }

  private getAuthorities() {
    let auth = this.tokenService.getAuthorities();

    this.isAuthorized = auth &&
      auth.map(item => item.authority).includes('ROLE_ADMIN') ? true : false;
  };

  deleteClick() {
    this.delete_action.emit(this.education.id);
  }

  editClick() {
    this.edit_action.emit(this.education.id);
  }

  dateFormat(year: any, month: any): any {
    if (!year || !month) return null;

    month = month < 10 ? `0${month}` : month;
    return `${year}-${month}-01`;
  }

}
