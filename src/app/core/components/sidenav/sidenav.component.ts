import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavigationGroup } from '../../models/navigation-group.model';
import { NavigationItem } from '../../models/navigation-item.model';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  /** Indicates if the interface is on a mobile device. */
  @Input() isMobile: boolean;

  /** Array of navigation groups for the sidenav. */
  @Input() navigationGroups: Array<NavigationGroup>;

  /** Emits an event to toggle sidenav visibility. */
  @Output() toggle = new EventEmitter<boolean>();

  /**
   * Triggers when a navigation item is selected, performing its action and potentially toggling the sidenav on mobile.
   * @param navigation The navigation item selected.
   */
  selectItem(navigation: NavigationItem) {
    navigation.action?.();

    // Closes the sidenav on mobile devices if the item is configured to toggle it upon selection.
    if (this.isMobile && navigation.toggleIfMobile) {
      this.toggle.emit();
    }
  }
}
