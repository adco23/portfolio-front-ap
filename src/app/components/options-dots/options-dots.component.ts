import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-options-dots',
  templateUrl: './options-dots.component.html',
  styleUrls: ['./options-dots.component.css']
})
export class OptionsDotsComponent implements OnInit {

  @Input() options: string[];
  isDotsVisible: boolean = true;
  isOptionVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleShow(): void {
    console.log(this.options);
    this.isDotsVisible = !this.isDotsVisible;
    this.isOptionVisible = !this.isOptionVisible;
  }

  action(opt: any){
    console.log(opt)
  }
}
