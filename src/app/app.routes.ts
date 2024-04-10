import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent}
];
