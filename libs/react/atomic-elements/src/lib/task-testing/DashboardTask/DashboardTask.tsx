import { makeStyles } from '@material-ui/core/styles';
import { object } from '@storybook/addon-knobs';
import React from 'react';
import '../../../../../../styles/src/lib/index.scss';
import CardSection from '../../components/CardSection/CardSection';
import CardWidget from '../../components/CardSection/CardWidget';
import FilterSection from '../../components/FilterSection/FilterSection';
import PageIntroSection from '../../components/PageIntroSection/PageIntroSection';


const useStyles = makeStyles({
  dashboardTask: {
    'background-color': 'var(--application-background)',
    height: '100%',
    width: '100%',
    display: 'grid',
    'grid-auto-flow': 'row',
    'grid-template-columns': 'var(--wh-5XL) calc(100% - var(--wh-5XL))',
    'grid-auto-rows': '100%',
  },
  dashboardPageIntro: {
    margin: 'var(--pm-0) var(--pm-L) var(--pm-L) var(--pm-L)',
    'padding-top': 'var(--pm-L)',
  },
  dashboardCardSection: {
    height: 'calc(100vh - 166px)',
    margin: 'var(--pm-0) var(--pm-L)',
    'padding-bottom': 'var(--pm-L)',
    overflow: 'scroll',
  },
  dashboardFilterSection: {
    height: '100%',
    overflow: 'scroll',
  },
});

/* eslint-disable-next-line */
export interface DashboardTaskProps {}

const label = 'Props';
const testFilters = [
  {
    title: 'Filter-Name-A',
    options: [
      {
        value: 'Filter-A-Option-1',
        label: 'Filter A Option 1',
      },
      {
        value: 'Filter-A-Option-2',
        label: 'Filter A Option 2',
      },
      {
        value: 'Filter-A-Option-3',
        label: 'Filter A Option 3',
      },
      {
        value: 'Filter-A-Option-4',
        label: 'Filter A Option 4',
      },
      {
        value: 'Filter-A-Option-5',
        label: 'Filter A Option 5',
      },
    ],
  },
  {
    title: 'Filter-Name-B',
    options: [
      {
        value: 'Filter-B-Option-1',
        label: 'Filter B Option 1',
      },
      {
        value: 'Filter-B-Option-2',
        label: 'Filter B Option 2',
      },
      {
        value: 'Filter-B-Option-3',
        label: 'Filter B Option 3',
      },
      {
        value: 'Filter-B-Option-4',
        label: 'Filter B Option 4',
      },
      {
        value: 'Filter-B-Option-5',
        label: 'Filter B Option 5',
      },
    ],
  },
  {
    title: 'Filter-Name-C',
    options: [
      {
        value: 'Filter-C-Option-1',
        label: 'Filter C Option 1',
      },
      {
        value: 'Filter-C-Option-2',
        label: 'Filter C Option 2',
      },
      {
        value: 'Filter-C-Option-3',
        label: 'Filter C Option 3',
      },
      {
        value: 'Filter-C-Option-4',
        label: 'Filter C Option 4',
      },
      {
        value: 'Filter-C-Option-5',
        label: 'Filter C Option 5',
      },
    ],
  },
  {
    title: 'Filter-Name-D',
    options: [
      {
        value: 'Filter-D-Option-1',
        label: 'Filter D Option 1',
      },
      {
        value: 'Filter-D-Option-2',
        label: 'Filter D Option 2',
      },
      {
        value: 'Filter-D-Option-3',
        label: 'Filter D Option 3',
      },
      {
        value: 'Filter-D-Option-4',
        label: 'Filter D Option 4',
      },
      {
        value: 'Filter-D-Option-5',
        label: 'Filter D Option 5',
      },
      {
        value: 'Filter-D-Option-6',
        label: 'Filter D Option 6',
      },
      {
        value: 'Filter-D-Option-7',
        label: 'Filter D Option 7',
      },
    ],
  },
];
const testDatablob = {
  title: 'Dashboard',
  description: 'Text',
  showTitle: true,
  showDesc: true,
  theme: 'material-light',
  filters: testFilters,
};

interface Widgets {
  title: string;
}

const widgets: Widgets[] { title: 'Card1' }, { title: 'Card2' }, { title: 'Card3' }},
];

export const DashboardTask = (xprops: DashboardTaskProps) => {
  const classes = useStyles();constlet datablob = object(label, testDatablob);

  return (
    <div className={`${classes.dashboardTask} ${datablob.theme}`}>
      <div className={classes.dashboardFilterSection}>
        <FilterSection filters={datablob.filters} />
      </div>
      <div>
        <div className={classes.dashboardPageIntro}>
          <PageIntroSection
            attributes={[]}
            title={datablob.title}
            description={datablob.description}
            entity=""
            showActions={false}
            showDesc={datablob.showDesc}
            showTitle={datablob.showTitle}
            showAvatar={false}
            actions={[]}
            entityActions={[]}
          />
        </div>
        <div className={classes.dashboardCardSection}>
          <CardSection>
            {widgets.m(widget)get => (
              <CardWidget title={widget.title} icon={true}>
                <div>Hello</div>
              </CardWidget>
            ))}
          </CardSection>
        </div>
      </div>
    </div>
  );
};

export default DashboardTask;
