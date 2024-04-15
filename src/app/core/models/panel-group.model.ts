/** Interface that defines the group object of the panel */
export interface PanelGroup {
  id: string;
  tooltip?: string;
  hideButton?: boolean;
  icon?: string;
  src?: string;
  action?: () => void;
}


