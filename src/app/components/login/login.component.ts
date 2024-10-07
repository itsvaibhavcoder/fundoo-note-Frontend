import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user-service/user.service';
import {SnackbarService} from 'src/services/snackbar/snackbar.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get loginControls() {
    return this.loginForm.controls;
  }

  handleLogin() {
    this.submitted = !this.submitted;
    const { email, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.userService
        .loginSignUpApiCall('users/login', {
          email: email,
          password: password,
        })
        .subscribe({
          next: (res: any) => {
            console.log(res);
            localStorage.setItem('accessToken', res?.data?.generatedToken);
            localStorage.setItem('name', res?.data?.firstName);
            localStorage.setItem('email', res?.data?.email);
            this.router.navigate(['/notes']);
            this.snackbarService.showMessage('User logged out successfully!');
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
