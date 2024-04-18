import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiConfigService } from '../../core/services/api-config.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { Router } from '@angular/router';
import { TOKEN_KEY } from './auth.constants';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let apiConfigSpy: jasmine.SpyObj<ApiConfigService>;
  let cookieSpy: jasmine.SpyObj<SsrCookieService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    apiConfigSpy = jasmine.createSpyObj('ApiConfigService', ['getApiUrl']);
    cookieSpy = jasmine.createSpyObj('SsrCookieService', ['get', 'set', 'delete']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ApiConfigService, useValue: apiConfigSpy },
        { provide: SsrCookieService, useValue: cookieSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    apiConfigSpy.getApiUrl.and.returnValue('http://example.com');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should return a token and store it', () => {
      const token = 'fake-token';
      service.login({ username: 'user', password: 'pass' }).subscribe(data => {
        expect(data).toEqual(token);
        expect(cookieSpy.set).toHaveBeenCalledWith(TOKEN_KEY, token);
        expect(service.currentTokenValue).toBe(token);
      });

      const req = httpTestingController.expectOne('http://example.com/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(token);
    });
  });

  describe('#register', () => {
    it('should return a token and store it upon registration', () => {
      const token = 'fake-token';
      service.register({ username: 'newuser', email: 'test@example.com', password: '12345678' }).subscribe(data => {
        expect(data).toEqual(token);
        expect(cookieSpy.set).toHaveBeenCalledWith(TOKEN_KEY, token);
        expect(service.currentTokenValue).toBe(token);
      });

      const req = httpTestingController.expectOne('http://example.com/api/auth/register');
      expect(req.request.method).toBe('POST');
      req.flush(token);
    });
  });

  describe('#logout', () => {
    it('should delete the token and navigate to login', () => {
      service.logout();
      expect(cookieSpy.delete).toHaveBeenCalledWith(TOKEN_KEY);
      expect(service.currentTokenValue).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('#isAuthenticated', () => {
    it('should return true if there is a token', () => {
      service['currentTokenSubject'].next('fake-token');
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false if there is no token', () => {
      service['currentTokenSubject'].next(null);
      expect(service.isAuthenticated()).toBeFalse();
    });
  });
});
