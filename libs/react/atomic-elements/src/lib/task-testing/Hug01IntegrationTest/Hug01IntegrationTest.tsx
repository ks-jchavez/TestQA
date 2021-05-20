import { makeStyles } from '@material-ui/core';
import React from 'react';
import '../../../../../../styles/src/lib/index.scss';
import '../../../../../../styles/src/lib/reset.scss';
import FullAreaCardSection01 from '../../components/FullAreaCardSection01/FullAreaCardSection01';
import FullAreaCardWidget01 from '../../components/FullAreaCardWidget01/FullAreaCardWidget01';
import WidgetSection01 from '../../components/WidgetSection01/WidgetSection01';
import WidgetSection03 from '../../components/WidgetSection03/WidgetSection03';
import {
  CardTitle01,

  CardTitle02, H3Title01,

  H3Title02, SecondaryCardSection01,
  SecondaryCardWidget01
} from '../../index.stories';

const useStyles = makeStyles({
  hug01: {
    backgroundColor: '#E3E3E3',
    height: '100vh',
    display: 'flex',
  },
  FullAreaCardSection01: {
    width: 'calc(100% - 2*(var(--wh-5XL) +var(--pm-1XS) + var(--pm-1XS)))',
    height: '100%',
  },
  secondaryCardSectionContainer: {
    width: 'calc(var(--wh-5XL) + var(--pm-L) + var(--pm-L))',
    height: '100%',
  },
});

/* eslint-disable-next-line */
export interface Hug01IntegrationTestProps {}

const label = 'Props';

export const Hug01IntegrationTest = (xprops: Hug01IntegrationTestProps) => {
  const classes = useStyles();

  return (
    <div className={classes.hug01}>
      <div className={classes.secondaryCardSectionContainer}>
        <SecondaryCardSection01>
          <SecondaryCardWidget01>
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
          </SecondaryCardWidget01>
          <SecondaryCardWidget01>
            <CardTitle02>
              <H3Title02>
                <div>A - Title</div>
              </H3Title02>
              <div></div>
              <div></div>
            </CardTitle02>
            <div></div>
          </SecondaryCardWidget01>
          <SecondaryCardWidget01>
            <CardTitle02>
              <H3Title02>
                <div>A - Title</div>
              </H3Title02>
              <div></div>
              <div></div>
            </CardTitle02>
            <div></div>
          </SecondaryCardWidget01>
          <SecondaryCardWidget01>
            <CardTitle02>
              <H3Title02>
                <div>A - Title</div>
              </H3Title02>
              <div></div>
              <div></div>
            </CardTitle02>
            <div></div>
          </SecondaryCardWidget01>
        </SecondaryCardSection01>
      </div>

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
            <WidgetSection01>
              <div>Hola</div>
            </WidgetSection01>
          </FullAreaCardWidget01>
        </FullAreaCardSection01>
      </div>

      <div className={classes.secondaryCardSectionContainer}>
        <SecondaryCardSection01>
          <SecondaryCardWidget01>
            <CardTitle02>
              <H3Title02>
                <div>A - Title</div>
              </H3Title02>
              <div></div>
              <div></div>
            </CardTitle02>
            <div></div>
          </SecondaryCardWidget01>
          <SecondaryCardWidget01>
            <CardTitle02>
              <H3Title02>
                <div>A - Title</div>
              </H3Title02>
              <div></div>
              <div></div>
            </CardTitle02>
            <div></div>
          </SecondaryCardWidget01>
          <SecondaryCardWidget01>
            <CardTitle02>
              <H3Title02>
                <div>A - Title</div>
              </H3Title02>
              <div></div>
              <div></div>
            </CardTitle02>
            <div></div>
          </SecondaryCardWidget01>
          <SecondaryCardWidget01>
            <CardTitle02>
              <H3Title02>
                <div>A - Title</div>
              </H3Title02>
              <div></div>
              <div></div>
            </CardTitle02>
            <div></div>
          </SecondaryCardWidget01>
        </SecondaryCardSection01>
      </div>
    </div>
  );
};

export default Hug01IntegrationTest;
