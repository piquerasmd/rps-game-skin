import { FormControl } from '@angular/forms';

export interface SignupForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}
