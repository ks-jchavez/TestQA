export interface FooterNavLeftProps {
  accountMenuList: MenuListProps[];
  helpUrl?: string;
  navigate?: (path: string, bool: boolean) => void;
}

export interface MenuListProps {
  title: string;
  path: string;
  func?: () => void;
}
