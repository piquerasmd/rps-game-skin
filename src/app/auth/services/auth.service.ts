import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TOKEN_KEY } from './auth.constants';
import { Router } from '@angular/router';
import { ApiConfigService } from '../../core/services/api-config.service';
import { UserLoginDTO } from '../models/user-login-dto.model';
import { UserCreateDTO } from '../models/user-create-dto.model';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentTokenSubject: BehaviorSubject<string | null>;
  public currentToken: Observable<string | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiConfigService: ApiConfigService,
    private cookieService: SsrCookieService
  ) {
    this.currentTokenSubject = new BehaviorSubject<string | null>(
      cookieService.get(TOKEN_KEY),
    );
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): string | null {
    return this.currentTokenSubject.value;
  }

  login(userLogin: UserLoginDTO): Observable<string> {
    return this.http
      .post<string>(`${this.apiConfigService.getApiUrl()}/api/auth/login`, userLogin, {
        responseType: 'text' as 'json',
      })
      .pipe(
        map((token) => {
          this.setToken(token);
          return token;
        }),
      );
  }

  register(user: UserCreateDTO): Observable<string> {
    return this.http
      .post<string>(`${this.apiConfigService.getApiUrl()}/api/auth/register`, user, {
        responseType: 'text' as 'json',
      })
      .pipe(
        map((token) => {
          this.setToken(token);
          return token;
        }),
      );
  }

  logout() {
    this.cookieService.delete(TOKEN_KEY);
    this.currentTokenSubject.next(null);
    this.toLogin();
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentTokenValue;
  }

  private setToken(token: string): void {
    this.cookieService.set(TOKEN_KEY, token);
    this.currentTokenSubject.next(token);
  }
}
