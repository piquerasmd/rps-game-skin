import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutComponent } from './main-layout.component';
import { AuthService } from '../../../auth/services/auth.service';
import { LayoutService } from '../../services/layout.service';
import { of } from 'rxjs';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let layoutServiceSpy: jasmine.SpyObj<LayoutService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'logout', 'toLogin']);
    layoutServiceSpy = jasmine.createSpyObj('LayoutService', ['isMobile$']);

    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: LayoutService, useValue: layoutServiceSpy }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    authServiceSpy.isAuthenticated.and.returnValue(true); 
    layoutServiceSpy.isMobile$ = of(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.logout on onLogout', () => {
    component.onLogout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });

  it('should call AuthService.toLogin on onLogin', () => {
    component.onLogin();
    expect(authServiceSpy.toLogin).toHaveBeenCalled();
  });

  it('should initialize navigation groups based on isAuthenticated', () => {
    expect(component.navigationGroups.some(group => group.hideInDesktop === true)).toBeTrue();
    expect(component.navigationGroups.some(group => group.hideInMobile === true)).toBeTrue();
  });
});
