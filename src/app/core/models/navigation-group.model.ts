import { NavigationItem } from './navigation-item.model';

/** Interface that defines the navigation menu group object */
export interface NavigationGroup {
  title?: string;
  hideInDesktop?: boolean;
  hideInMobile?: boolean;
  list: NavigationItem[];
}

