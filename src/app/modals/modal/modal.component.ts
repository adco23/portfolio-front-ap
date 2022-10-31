import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  icon_close = faXmark;

  constructor() { }

  ngOnInit(): void {

  }

  closeDialog() {
    document.querySelector('dialog')?.close();
  }
}
