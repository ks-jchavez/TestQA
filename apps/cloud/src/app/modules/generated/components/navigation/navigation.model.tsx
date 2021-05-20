interface MenuOption {
  func?: () => Promise<unknown>;
  icon?: string;
  path: string;
  title: string;
}

export interface NavigationSettings {
  accountMenuOptions: MenuOption[];
  helpUrl?: string;
  logo: string;
  menuOptions: MenuOption[];
}
