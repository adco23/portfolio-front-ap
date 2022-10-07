import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isHidden: string = 'hidden';

  constructor() { }

  ngOnInit(): void {
  }

  switchShow () {
    this.isHidden = this.isHidden === 'hidden' ? '' : 'hidden';

  }

}
