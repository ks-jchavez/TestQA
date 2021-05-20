import { AddDialog } from '@kleeen/react/atomic-elements';

export const snackBarSectionActions = [
  {
    areYouSure: false,
    component: AddDialog,
    description: undefined,
    displayName: `Add`,
    name: `add`,
    type: `add`,
  },
  {
    areYouSure: false,
    component: undefined,
    description: undefined,
    displayName: `Delete`,
    name: `_delete_`,
    type: `delete`,
  },
];
