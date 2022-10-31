export class LoginUser {
  username?: string;
  email?: string;
  password: string;

  constructor(password: string, username: string, email: string) {
    this.password = password;
    this.username = username;
    this.email = email;
  }
}
