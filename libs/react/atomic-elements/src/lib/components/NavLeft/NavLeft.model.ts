import { ReactNode } from 'react';

export interface NavLeftProps {
  menuList: MenuListProps[];
  accountMenuList: MenuListProps[];
  logo: string;
  helpUrl?: string;
  productName?: string;
  children?: ReactNode;
}

export interface MenuListProps {
  func?: () => void;
  icon?: string;
  path: string;
  title: string;
}
