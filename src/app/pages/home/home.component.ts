import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { faLinkedinIn, faGithubAlt } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User = {};
  users: User[] = [];
  icon_linkedin = faLinkedinIn;
  icon_github = faGithubAlt;

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.userService.getUser().subscribe(data => this.user = data);
  }

}
