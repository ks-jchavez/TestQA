import { KSAuth } from '@kleeen/auth';
import { NavigationSettings } from './navigation.model';

export const Settings: NavigationSettings = {
  accountMenuOptions: [
    {
      title: 'User Preferences',
      path: '/profile/endUserPreferences/edit',
    },
    {
      title: 'Logout',
      path: '/logout',
      func: (): Promise<unknown> => KSAuth.signOut().catch(console.warn),
    },
  ],
  helpUrl: undefined,
  logo: `assets/logo.png`,
  menuOptions: [
    {
      title: `NETFLIX`,
      path: `/netflix`,
      icon: `ks-navigation-rwjfAmQicaDQRuZTokvBBM`,
    },
  ],
};
