import React, { ReactElement } from 'react';
import appSettings from '../../../../settings/app.json';

import { NavTop, NavLeft } from '@kleeen/react/atomic-elements';
import { Settings } from './navigation.settings';
import { NavPosition } from '@kleeen/types';

export function NavigationTask(): ReactElement {
  const navCommonProps = {
    accountMenuList: Settings.accountMenuOptions,
    helpUrl: Settings.helpUrl,
    logo: Settings.logo,
    menuList: Settings.menuOptions,
    productName: appSettings.productName,
  };
  const Nav = appSettings.layout.position === NavPosition.top ? NavTop : NavLeft;

  return <Nav {...navCommonProps} />;
}

export default NavigationTask;
