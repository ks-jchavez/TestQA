import { makeStyles } from '@material-ui/core';
import React from 'react';
import '../../../../../../styles/src/lib/index.scss';
import '../../../../../../styles/src/lib/reset.scss';
import FullAreaCardSection01 from '../../components/FullAreaCardSection01/FullAreaCardSection01';
import FullAreaCardWidget01 from '../../components/FullAreaCardWidget01/FullAreaCardWidget01';
import WidgetSection03 from '../../components/WidgetSection03/WidgetSection03';
import {
  CardTitle01,

  CardTitle02, H3Title01,

  H3Title02,

  SecondaryCardSection02,
  SecondaryCardWidget02
} from '../../index.stories';

const useStyles = makeStyles({
  hug01: {
    backgroundColor: '#E3E3E3',
    height: '100vh',
  },
  FullAreaCardSection01: {
    width: '100%',
    height: 'calc(100% - (var(--wh-4XL) + var(--pm-L)))',
  },
  secondaryCardSectionContainer: {
    width: '100%',
    height: 'calc(var(--wh-4XL) + var(--pm-L))',
  },
});

/* eslint-disable-next-line */
export interface Hug02IntegrationTestProps {}

const label = 'Props';

export const Hug02IntegrationTest = (props: Hug02IntegrationTestProps) => {
  const classes = useStyles();

  return (
    <div className={classes.hug01}>
      <div className={classes.FullAreaCardSection01}>
        <FullAreaCardSection01>
          <FullAreaCardWidget01>
            <CardTitle01>
              <H3Title01>
                <div>Card Title here</div>
              </H3Title01>
              <div>B</div>
              <div>C</div>
            </CardTitle01>
            <WidgetSection03>
              <div>Hola</div>
            </WidgetSection03>
          </FullAreaCardWidget01>
        </FullAreaCardSection01>
      </div>

      <div className={classes.secondaryCardSectionContainer}>
        <SecondaryCardSection02>
          <SecondaryCardWidget02>
            <CardTitle02>
              <H3Title02>
                <>A - Title</>
              </H3Title02>
              <div></div>
              <div></div>
            </CardTitle02>
            <WidgetSection03>
              <div>hola</div>
            </WidgetSection03>
          </SecondaryCardWidget02>
          <SecondaryCardWidget02>
            <CardTitle02>
              <H3Title02>
                <div>A - Title</div>
              </H3Title02>
              <div></div>
              <div></div>
            </CardTitle02>
            <WidgetSection03>
              <div>hola</div>
            </WidgetSection03>
          </SecondaryCardWidget02>
          <SecondaryCardWidget02>
            <CardTitle02>
              <H3Title02>
                <div>A - Title</div>
              </H3Title02>
              <div></div>
              <div></div>
            </CardTitle02>
            <WidgetSection03>
              <div>hola</div>
            </WidgetSection03>
          </SecondaryCardWidget02>
        </SecondaryCardSection02>
      </div>
    </div>
  );
};

export default Hug02IntegrationTest;
