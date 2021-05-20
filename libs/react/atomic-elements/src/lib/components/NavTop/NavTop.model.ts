export interface NavTopProps {
  menuList: MenuListProps[];
  accountMenuList: MenuListProps[];
  logo: string;
  helpUrl?: string;
}
export interface MenuListProps {
  title: string;
  path: string;
  func?: () => void;
}