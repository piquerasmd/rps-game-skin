import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PanelGroup } from '../../models/panel-group.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatTooltipModule, MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  /** Emits an event to toggle sidenav visibility. */
  @Output() toggle = new EventEmitter<boolean>();

  /** Determines whether to display the menu button. */
  @Input() showMenu: boolean;

  /** Path to the logo image resource. */
  @Input() logo: any;

  /** Determines whether to display the back navigation button. */
  @Input() showRouterBackButton: boolean;

  /** Indicates if the interface is on a mobile device. */
  @Input() isMobile: boolean | null;

  /** Array of buttons for the panel. */
  @Input() panelButtons: Array<PanelGroup>;

  /** Configuration for the login button. */
  @Input() login: PanelGroup;

  constructor(private router: Router, private route: ActivatedRoute) {}

  /**
   * Executes the action received as a parameter
   * @param panelGroup function to be executed
   */

  selectButton(panelGroup: PanelGroup) {
    if (panelGroup.action) {
      panelGroup.action();
    }
  }

  /**
   * Emit togle event
   */
  onToggle() {
    this.toggle.emit();
  }

  /**
   * We return to the previous path or close the detail sidenav.
   */
  onNavigateBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
