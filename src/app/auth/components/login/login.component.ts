import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LoginForm } from './login-form.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  /** Email form control */
  formControl: FormGroup<LoginForm>;

  /** Determines if there has been an error when logging in */
  isError = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this._initFormGroup();
  }

  /**
   * Requests the token for the user
   */
  login() {
    if (this.formControl.invalid) {
      return;
    }
    // Disable the form while the request is being made
    this.formControl.disable();
    this.authService
      .login(this.formControl.getRawValue())
      .subscribe({
        next: () => {
          this.router.navigate(['/game']);
        },
        error: (error) => {
          this.isError = true;
          this.formControl.enable();
        },
      });
  }

  /**
   * Initialize FormGroup
   */
  _initFormGroup() {
    this.formControl = this.formBuilder.nonNullable.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
