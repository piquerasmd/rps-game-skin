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
import { SignupForm } from './signup-form.interface';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  /** Email form control */
  formControl: FormGroup<SignupForm>;

  /** Determines whether or not a user is being created */
  isCreatingUser = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this._initFormGroup();
  }

  /**
   * Updates user's information
   */
  save() {
    if (this.formControl.invalid) {
      return;
    }
    this.isCreatingUser = true;
    this.authService.register(this.formControl.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.isCreatingUser = false;
      },
    });
  }

  /**
   * Initializes FormGroup
   */
  _initFormGroup() {
    this.formControl = this.formBuilder.nonNullable.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
