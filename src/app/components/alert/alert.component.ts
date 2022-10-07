import { Component, OnInit, Input } from '@angular/core';
import { faCheckCircle, IconDefinition, faBell, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() showAlert: boolean;
  @Input() typeAlert: string;
  @Input() message: string;
  icon: IconDefinition;

  constructor() { }

  ngOnInit(): void {
  }

  setType(): string{
    switch (this.typeAlert) {
      case 'danger':
        this.icon = faXmark;
        return 'bg-red-400';

      case 'success':
        this.icon = faCheckCircle;
        return 'bg-green-400';

      default:
        this.icon = faBell;
        return 'bg-blue-400';
    }
  }
}
