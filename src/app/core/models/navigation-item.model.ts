/** Interface that defines navigation menu group item object */
export interface NavigationItem {
  id: string;
  title: string;
  label: string;
  icon?: string;
  src?: string;
  link?: string;
  hideInDesktop?: boolean;
  hideInMobile?: boolean;
  toggleIfMobile?: boolean;
  action?: () => void;
}
