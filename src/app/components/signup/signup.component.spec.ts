import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/services/user-service/user.service';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mocking UserService and Router
    const userServiceSpy = jasmine.createSpyObj('UserService', ['loginSignUpApiCall']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  // Test form initialization
  it('should create the signup form with firstName, lastName, email, and password controls', () => {
    expect(component.signUpForm).toBeDefined();
    expect(component.signUpForm.contains('firstName')).toBeTrue();
    expect(component.signUpForm.contains('lastName')).toBeTrue();
    expect(component.signUpForm.contains('email')).toBeTrue();
    expect(component.signUpForm.contains('password')).toBeTrue();
  });

  // Test form validity with invalid email
  it('should invalidate the form when email is incorrect', () => {
    component.signUpForm.controls['firstName'].setValue('John');
    component.signUpForm.controls['lastName'].setValue('Doe');
    component.signUpForm.controls['email'].setValue('invalid-email');
    component.signUpForm.controls['password'].setValue('password123');
    expect(component.signUpForm.invalid).toBeTrue();
  });

  // Test form validity with valid data
  it('should validate the form when all fields are correct', () => {
    component.signUpForm.controls['firstName'].setValue('John');
    component.signUpForm.controls['lastName'].setValue('Doe');
    component.signUpForm.controls['email'].setValue('test@example.com');
    component.signUpForm.controls['password'].setValue('password123');
    expect(component.signUpForm.valid).toBeTrue();
  });

  // Test handleRegister() with valid form submission and successful API call
  it('should call userService.loginSignUpApiCall and navigate to / on successful registration', () => {
    // Set up form to be valid
    component.signUpForm.controls['firstName'].setValue('John');
    component.signUpForm.controls['lastName'].setValue('Doe');
    component.signUpForm.controls['email'].setValue('test@example.com');
    component.signUpForm.controls['password'].setValue('password123');

    // Mock successful signup response
    const responseMock = { message: 'Registration successful' };
    userService.loginSignUpApiCall.and.returnValue(of(responseMock)); // Mocking the API call to return a response

    component.handleRegister();

    expect(userService.loginSignUpApiCall).toHaveBeenCalledWith('users/signup', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123'
    });

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  // Test handleRegister() with failed API call
  it('should log an error if signup API call fails', () => {
    spyOn(console, 'log');

    // Set up form to be valid
    component.signUpForm.controls['firstName'].setValue('John');
    component.signUpForm.controls['lastName'].setValue('Doe');
    component.signUpForm.controls['email'].setValue('test@example.com');
    component.signUpForm.controls['password'].setValue('password123');

    // Mock an error response
    const errorMock = { error: 'Registration failed' };
    userService.loginSignUpApiCall.and.returnValue(throwError(errorMock)); // Mocking the API call to return an error

    component.handleRegister();

    expect(userService.loginSignUpApiCall).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('API error:', errorMock);
  });

  // Test handleRegister() with invalid form submission
  it('should not call userService.loginSignUpApiCall when the form is invalid', () => {
    // Set up form to be invalid
    component.signUpForm.controls['firstName'].setValue('');
    component.signUpForm.controls['lastName'].setValue('');
    component.signUpForm.controls['email'].setValue('');
    component.signUpForm.controls['password'].setValue('');

    component.handleRegister();

    expect(userService.loginSignUpApiCall).not.toHaveBeenCalled();
  });
});
