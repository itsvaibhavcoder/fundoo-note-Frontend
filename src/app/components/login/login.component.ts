import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  submitted: boolean=false
  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });
}
get loginControls(){
  return this.loginForm.controls
}

  handleLogin() {
    this.submitted = !this.submitted
    const {email, password} = this.loginForm.value
    if(this.loginForm.valid){
       this.userService
      .loginSignUpApiCall('users/login', {
      email: email,
      password: password,
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
}
