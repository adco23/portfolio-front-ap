import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isHidden: string = 'hidden';
  isLogged: boolean = false;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.getToken() ? true : false;
  }

  switchShow () {
    this.isHidden = this.isHidden === 'hidden' ? '' : 'hidden';
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.tokenService.logout();

    window.location.reload();
  }

}
