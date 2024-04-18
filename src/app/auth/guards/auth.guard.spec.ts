import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authService }],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);

    expect(executeGuard({} as any, {} as any)).toBeTrue();
  });
});
