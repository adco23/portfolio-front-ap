import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: boolean = false;
  isLoginFail: boolean = false;
  loginUser!: LoginUser;
  username!: string;
  password!: string;
  email!: string;
  roles: string[];
  errorMsj!: string;

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    } else {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  }

  get form(): any {
    return this.loginForm.controls;
  }

  onLogin(): void {

    if(this.loginForm.invalid) return;

    let { username, password } = this.loginForm.value;

    this.loginUser = new LoginUser(username, password);

    try {
      this.authService.login(this.loginUser)
        .subscribe(data => {
          this.isLogged = true;
          this.isLoginFail = false;

          this.tokenService.setToken(data.token);
          this.tokenService.setUsername(data.username);
          this.tokenService.setAuthorities(data.authorities);

          this.roles = data.authorities;

          this.router.navigate(['/home']);
        })

    } catch (error: any) {
      this.isLogged = false;
      this.isLoginFail = true;
      this.errorMsj = error.error.message;

      console.error(this.errorMsj);
    }
  }

}
