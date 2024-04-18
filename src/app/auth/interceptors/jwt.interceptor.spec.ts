import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import { jwtInterceptor } from './jwt.interceptor';
import { AuthService } from '../services/auth.service';

describe('jwtInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => jwtInterceptor(req, next));
  let authService: any = {};
  let req: jasmine.SpyObj<HttpRequest<any>>;

  beforeEach(() => {
    req = jasmine.createSpyObj('HttpRequest', ['clone']);
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authService }],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add an Authorization header when there is a token', () => {
    const token = '12345';
    authService.currentTokenValue = token;

    interceptor(req, (r: any) => r);

    expect(req.clone).toHaveBeenCalledWith({
      setHeaders: {
        Authorization: `Bearer 12345`,
      },
    });
  });

  it('should not add an Authorization header when there is no token', () => {
    authService.currentTokenValue = null;

    interceptor(req, (r: any) => r);

    expect(req.clone).not.toHaveBeenCalled();
  });
});
