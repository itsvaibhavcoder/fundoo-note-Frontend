import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/services/user-service/user.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['loginSignUpApiCall']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  // Test form initialization
  it('should create the login form with email and password controls', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  // Test form validity with incorrect email
  it('should invalidate the form when email is incorrect', () => {
    component.loginForm.controls['email'].setValue('invalid-email');
    component.loginForm.controls['password'].setValue('123456');
    expect(component.loginForm.invalid).toBeTrue();
  });

  // Test form validity with valid email and password
  it('should validate the form when email and password are correct', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    expect(component.loginForm.valid).toBeTrue();
  });

  // Test handleLogin() with valid form submission and successful API call
  it('should call userService.loginSignUpApiCall and navigate to /notes on successful login', () => {
    // Set up form to be valid
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    // Mock successful login response
    const responseMock = {
      data: { generatedToken: 'dummy-token' }
    };
    userService.loginSignUpApiCall.and.returnValue(of(responseMock));

    component.handleLogin();

    expect(userService.loginSignUpApiCall).toHaveBeenCalledWith('users/login', {
      email: 'test@example.com',
      password: 'password123'
    });

    expect(localStorage.getItem('accessToken')).toEqual('dummy-token');
    expect(router.navigate).toHaveBeenCalledWith(['/notes']);
  });

  // Test handleLogin() with invalid form submission
  it('should not call userService.loginSignUpApiCall when the form is invalid', () => {
    // Set up form to be invalid
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');

    component.handleLogin();

    expect(userService.loginSignUpApiCall).not.toHaveBeenCalled();
  });

  // Test handleLogin() with failed API call
  it('should log an error if login API call fails', () => {
    spyOn(console, 'log');

    // Set up form to be valid
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    // Mock an error response
    const errorMock = { error: 'Invalid login' };
    userService.loginSignUpApiCall.and.returnValue(throwError(errorMock));

    component.handleLogin();

    expect(userService.loginSignUpApiCall).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(errorMock);
  });
});
