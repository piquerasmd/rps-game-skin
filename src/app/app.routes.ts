import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { authGuard } from './auth/guards/auth.guard';
import { SignupComponent } from './auth/components/signup/signup.component';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { GameBoardComponent } from './game/components/game-board/game-board.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: '', redirectTo: 'game', pathMatch: 'full' },
    { path: '', component: MainLayoutComponent, children: [
        { path: 'game', component: GameBoardComponent },
        // { path: 'stats', component: StatComponent, canActivate: [authGuard] },
    ]},
];
