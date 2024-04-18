import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { AuthService } from '../../services/auth.service';
import { Router, provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['register']);
    await TestBed.configureTestingModule({
      imports: [SignupComponent, NoopAnimationsModule],
      providers: [{ provide: AuthService, useValue: authService }, provideRouter([])],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#_initFormGroup should initialize form controls with validators', () => {
    const usernameControl = component.formControl.get('username');
    const emailControl = component.formControl.get('email');
    const passwordControl = component.formControl.get('password');
    expect(usernameControl).toBeTruthy();
    expect(emailControl).toBeTruthy();
    expect(passwordControl).toBeTruthy();
    expect(usernameControl?.errors?.['required']).toBeTruthy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
    expect(passwordControl?.errors?.['required']).toBeTruthy();
  });

  it('#save should not call authService.register if form is invalid', () => {
    component.formControl.controls['email'].setValue('a');
    component.save();
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('#save should call authService.register and navigate on success', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    authService.register.and.returnValue(of('token'));

    component.formControl.setValue({
      username: 'newuser',
      email: 'test@example.com',
      password: '12345678'
    });
    component.save();
    tick();

    expect(authService.register).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  }));

  it('#save should handle errors correctly', () => {
    authService.register.and.returnValue(throwError(() => new Error('Registration failed')));
    component.formControl.setValue({
      username: 'newuser',
      email: 'test@example.com',
      password: '12345678'
    });
    component.save();

    expect(component.isCreatingUser).toBeFalse();
  });
});
