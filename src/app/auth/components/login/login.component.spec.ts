import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router, provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    await TestBed.configureTestingModule({
      imports: [LoginComponent, NoopAnimationsModule],
      providers: [{ provide: AuthService, useValue: authService }, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#_initFormGroup should initialize form controls with validators', () => {
    const usernameControl = component.formControl.get('username');
    const passwordControl = component.formControl.get('password');
    expect(usernameControl).toBeTruthy();
    expect(usernameControl?.errors?.['required']).toBeTruthy();
    expect(passwordControl).toBeTruthy();
    expect(passwordControl?.errors?.['required']).toBeTruthy();
  });

  it('#login should not proceed if form is invalid', () => {
    component.formControl.controls['username'].setValue('');
    component.formControl.controls['password'].setValue('');
    component.login();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('#login should return stubbed value from a spy when form is valid', () => {
    component.formControl.controls['username'].setValue('validuser');
    component.formControl.controls['password'].setValue('validpassword');
    authService.login.and.returnValue(of('token'));
    component.login();
    expect(authService.login).toHaveBeenCalled();
  });

  it('#login should navigate on successful login', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.formControl.controls['username'].setValue('user');
    component.formControl.controls['password'].setValue('password');
    authService.login.and.returnValue(of('token'));
    component.login();
    tick();

    expect(navigateSpy).toHaveBeenCalledWith(['/game']);
  }));

  it('#login should handle login error correctly', () => {
    authService.login.and.returnValue(throwError(() => new Error('Login failed')));
    component.formControl.controls['username'].setValue('user');
    component.formControl.controls['password'].setValue('password');
    component.login();

    expect(component.isError).toBeTrue();
    expect(component.formControl.enabled).toBeTrue();
  });

});
