import { HttpClient } from '@angular/common/http';
import { Injectable, TransferState } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TOKEN_KEY } from './auth.constants';
import { Router } from '@angular/router';
import { ApiConfigService } from '../../core/services/api-config.service';
import { UserLoginDTO } from '../models/user-login-dto.model';
import { UserCreateDTO } from '../models/user-create-dto.model';

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
    private transferState: TransferState,
  ) {
    this.currentTokenSubject = new BehaviorSubject<string | null>(
      transferState.get(TOKEN_KEY, null),
    );
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): string | null {
    return this.currentTokenSubject.value;
  }

  login(userLogin: UserLoginDTO): Observable<string> {
    return this.http
      .post<string>(`${this.apiConfigService.getApiUrl()}/api/auth/login`, userLogin)
      .pipe(
        map((token) => {
          this.setToken(token);
          return token;
        }),
      );
  }

  register(user: UserCreateDTO): Observable<string> {
    return this.http.post<string>(`${this.apiConfigService.getApiUrl()}/api/auth/register`, user)
    .pipe(
      map((token) => {
        this.setToken(token);
        return token;
      }),
    );
  }

  logout() {
    this.transferState.remove(TOKEN_KEY);
    this.currentTokenSubject.next(null);
    this.toLogin();
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentTokenValue !== null;
  }

  private setToken(token: string): void {
    this.transferState.set(TOKEN_KEY, JSON.stringify(token));
    this.currentTokenSubject.next(token);
  }
  
}
