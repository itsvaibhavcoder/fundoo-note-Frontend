import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user-service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  register: boolean = false;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  })
  }

  get signUpControls() {
    return this.signUpForm.controls;
  }

  handleRegister() {
    this.register = true;
    const { firstName, lastName, email, password } = this.signUpForm.value;
    this.userService.loginSignUpApiCall('users/signup', {
      firstName,
      lastName,
      email,
      password
    }).subscribe({
      next: (res: any) => {
        console.log('API response:', res);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('API error:', err);
      }
    });
  }
}
