import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit {

  @ViewChild('monthSelected') monthSelected!: ElementRef;
  @ViewChild('yearSelected') yearSelected!: ElementRef;

  all_months: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  year: number = new Date().getFullYear();
  range: number[] = [];
  selected: any = {
    year: null,
    month: null,
  }

  @Output() dateEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.yearRange();
  }

  yearRange() {
    this.range.push(this.year);

    while (this.range.length <= 100) {
      this.year -= 1;
      this.range.push(this.year);
    }
  }

  onSelected(type: string): void {
    let value = this[type === 'year' ? 'yearSelected' : 'monthSelected'].nativeElement.value;

    this.selected[type] = value === '' ? null : Number(value);

    this.dateEvent.emit(this.selected);
  }
}
