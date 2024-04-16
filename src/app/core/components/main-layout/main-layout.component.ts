import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { PanelGroup } from '../../models/panel-group.model';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../services/layout.service';
import { LetDirective } from '@ngrx/component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { NavigationGroup } from '../../models/navigation-group.model';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    MatListModule,
    MatSidenavModule,
    CommonModule,
    LetDirective,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {

  /** Reference to the side menu */
  @ViewChild('mainSidenav') sidenav: MatSidenav;

  /** Variable that determines if it is a mobile size */
  isMobile$: Observable<boolean>;

  /** Variable that determines if the user is authenticated */
  isAuthenticated: boolean;

  /** Array with the header buttons */
  panelButtons: Array<PanelGroup> = [
    {
      id: 'header__logout-link',
      tooltip: 'Logout',
      icon: 'power_settings_new',
      hideButton: !this.auth.isAuthenticated(),
      action: this.onLogout.bind(this),
    },
  ];

  /** Login button */
  login: PanelGroup = {
    id: 'header__login__link',
    tooltip: 'Login',
    icon: 'exit_to_app',
    hideButton: this.auth.isAuthenticated(),
    action: this.onLogin.bind(this),
  };

  /** Array with the navigation groups */
  navigationGroups: Array<NavigationGroup>;

  constructor(private auth: AuthService, private layoutService: LayoutService) {
    this.isMobile$ = this.layoutService.isMobile$;
    this.isAuthenticated = this.auth.isAuthenticated();
    this._initNavigationGroups();
  }

  /**
   * Performs the application login
   */
  onLogin() {
    this.auth.toLogin();
  }

  /**
   * Performs application logout
   */
  onLogout() {
    this.auth.logout();
  }

  /**
   * Toggles the side menu
   */
  onToggle() {
    this.sidenav.toggle();
  }

  private _initNavigationGroups() {
    this.navigationGroups = [
      {
        list: [
          {
            id: 'sidenav__home-link',
            title: 'Home',
            label: 'Home',
            icon: 'home',
            link: '/game',
            toggleIfMobile: true,
          }
        ],
      },
      {
        title: 'Stats',
        hideInDesktop: !this.isAuthenticated,
        hideInMobile: !this.isAuthenticated,
        list: [
          {
            id: 'sidenav__stats-link',
            title: 'Results',
            label: 'Results',
            icon: 'insert_chart',
            link: '/games',
            toggleIfMobile: true,
          },
        ],
      },
      {
        title: 'ABOUT APP',
        hideInDesktop: true,
        list: [
          {
            id: 'sidenav__privacy-link',
            title: 'Privacy',
            label: 'Privacy',
            icon: 'verified_user',
            toggleIfMobile: true,
            link: '',
          },
          {
            id: 'sidenav__legal-link',
            title: 'Legal Notice',
            label: 'Legal Notice',
            icon: 'gavel',
            toggleIfMobile: true,
            link: '',
          },
          {
            id: 'sidenav__login__link',
            title: 'Login',
            label: 'Login',
            icon: 'exit_to_app',
            link: '/login',
            hideInMobile: this.isAuthenticated,
            toggleIfMobile: true,
          },
          {
            id: 'sidenav__logout-link',
            title: 'Logout',
            label: 'Logout',
            icon: 'power_settings_new',
            toggleIfMobile: false,
            link: '',
            hideInMobile: !this.isAuthenticated,
            action: this.onLogout.bind(this)
          }
        ],
      },
    ];
  }
}
