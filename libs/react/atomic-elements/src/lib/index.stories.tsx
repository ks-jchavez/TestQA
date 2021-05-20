import React from 'react'
import { withKnobs } from "@storybook/addon-knobs";
import { SecondaryCardSection01 } from './components/SecondaryCardSection01/SecondaryCardSection01';
import { SecondaryCardSection02 } from './components/SecondaryCardSection02/SecondaryCardSection02';
import CardTitle01 from './components/CardTitle01/CardTitle01';
import CardTitle02 from './components/CardTitle02/CardTitle02';
import H3Title01 from './components/H3Title01/H3Title01';
import H3Title02 from './components/H3Title02/H3Title02';
import SecondaryCardWidget01 from './components/SecondaryCardWidget01/SecondaryCardWidget01';
import SecondaryCardWidget02 from './components/SecondaryCardWidget02/SecondaryCardWidget02';
import Visualization from './components/Visualization/Visualization';
import Hug01IntegrationTest from './task-testing/Hug01IntegrationTest/Hug01IntegrationTest';
import Hug02IntegrationTest from './task-testing/Hug02IntegrationTest/Hug02IntegrationTest';


export default {
  title: 'Storybook Knobs',
  decorators: [withKnobs],
};
// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.

export {
  CardTitle01,
  CardTitle02,
  H3Title01,
  H3Title02,
  SecondaryCardSection01,
  SecondaryCardSection02,
  SecondaryCardWidget01, 
  SecondaryCardWidget02,
  Visualization,
  Hug01IntegrationTest,
  Hug02IntegrationTest,
};
