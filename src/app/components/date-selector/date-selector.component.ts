import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit {

  @ViewChild('monthSelected') monthSelected!: ElementRef;
  @ViewChild('yearSelected') yearSelected!: ElementRef;

  @Input() selected_year: any;
  @Input() selected_month: any;

  all_months: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  year: number = new Date().getFullYear();
  range: number[] = [];
  selected: any = {
    year: null,
    month: null,
  }

  @Output() dateEvent = new EventEmitter<any>();

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.yearRange();

    this.selected.month = this.selected_month;
    this.selected.year = this.selected_year;
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.renderer.setProperty(this.monthSelected.nativeElement, 'value', `${this.selected.month ? this.selected.month : ''}`);
      this.renderer.setProperty(this.yearSelected.nativeElement, 'value', `${this.selected.year ? this.selected.year : ''}`);
    }, 1000)
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
