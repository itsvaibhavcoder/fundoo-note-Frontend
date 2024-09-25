import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email:string = "vaibhav";
  password:string = "12345";
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  handleLogin() {
    console.log(this.email);
    console.log(this.password);
    this.userService
      .loginSignUpApiCall('users/login', {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res:any) => {
          console.log(res);
          localStorage.setItem("accessToken",res?.data?.generatedToken);
          this.router.navigate(['/notes'])
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
