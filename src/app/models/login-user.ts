export class LoginUser {
  username?: String;
  email?: String;
  password: String;

  constructor(password: String, username: String, email: String) {
    this.password = password;
    this.username = username;
    this.email = email;
  }
}
