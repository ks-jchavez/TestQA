import { makeStyles } from '@material-ui/core/styles';
import { object } from '@storybook/addon-knobs';
import React from 'react';
import '../../../../../../styles/src/lib/index.scss';
import GridSection, { Attribute } from '../../components/GridSection/GridSection';
import PageIntroSection from '../../components/PageIntroSection/PageIntroSection';
import SnackBarSection from '../../components/SnackBarSection/SnackBarSection';


const useStyles = makeStyles({
  gridTask: {
    'background-color': 'var(--application-background)',
    height: '100%',
  },
  gridPageIntro: {
    margin: 'var(--pm-0) var(--pm-L) var(--pm-L) var(--pm-L)',
    'padding-top': 'var(--pm-L)',
  },

  gridGridSection: {
    height: 'calc(100vh - 166px)',
    margin: 'var(--pm-0) var(--pm-L)',
    'padding-bottom': 'var(--pm-L)',
  },

  snackbar: {
    height: 'calc(100vh - 166px - 64px)',
  },
});

/* eslint-disable-next-line */
export interface GridTaskProps {}

const label = 'Props';

const testAttributes: Attribute[] = [
  {
    name: 'name',
    isMainValue: true,
    detailPage: 'department',
    isFilterable: { in: true, out: false },
  },
  {
    name: 'desc',
    isMainValue: false,
    isFilterable: { in: true, out: false },
  },
  {
    name: 'value',
    isMainValue: false,
    isFilterable: { in: true, out: false },
  },
];

const rows = [
  { id: 1, name: 'Name 1', desc: 'Desc 1', value: 1 },
  { id: 2, name: 'Name 2', desc: 'Desc 2', value: 2 },
  { id: 3, name: 'Name 3', desc: 'Desc 3', value: 3 },
  { id: 4, name: 'Name 4', desc: 'Desc 4', value: 4 },
  { id: 5, name: 'Name 5', desc: 'Desc 5', value: 5 },
  { id: 6, name: 'Name 6', desc: 'Desc 6', value: 6 },
  { id: 7, name: 'Name 7', desc: 'Desc 7', value: 7 },
  { id: 8, name: 'Name 8', desc: 'Desc 8', value: 8 },
  { id: 9, name: 'Name 9', desc: 'Desc 9', value: 9 },
  { id: 10, name: 'Name 10', desc: 'Desc 10', value: 10 },
  { id: 11, name: 'Name 11', desc: 'Desc 11', value: 11 },
];

const testDatablob = {
  title: 'Page Title',
  description: 'This is the description of the page. It should be short but helpful',
  entityName: 'Departments',
  attributes: testAttributes,
  showSelectAndExecute: false,
  showTitle: true,
  showDesc: true,
  showAvatar: false,
  showActions: true,
  actio [{ type: 'ADD' }, { type: 'DELETE' }
  ],
  theme: 'material-light',
};

export const GridTask = (xprops: GridTaskProps) => {
  const classes = useStyles();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const entityActions = [];
  const entity = { isLoading: false, data: rows };constlet datablob = object(label, testDatablob);
  return (
    <div className={`${classes.gridTask} ${datablob.theme}`}>
      <div className={classes.gridPageIntro}>
        <PageIntroSection
          attributes={datablob.attributes}
          title={datablob.title}
          description={datablob.description}
          entity={datablob.entityName}
          showActions={datablob.showActions}
          showDesc={datablob.showDesc}
          showTitle={datablob.showTitle}
          showAvatar={datablob.showAvatar}
          actions={datablob.actions}
          entityActions={entityActions}
        />
      </div>
      <div classNae= {`${classes.gridGridSection} ${selectedRows.length > 0 ? classes.snackbar : ''}`}>
        <GridSection
          attributes={datablob.attributes}
          entity={entity}
          entityName={datablob.entityName}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </div>
      <div>
        <SnackBarSection
          actions={datablob.actions}
          showSelectAndExecute={datablob.showSelectAndExecute}
          entity={datablob.entityName}
          selectedRows={selectedRows}
          showSnackBar={selectedRows.length > 0}
          setSelectedRows={setSelectedRows}
          entityActions={entityActions}
        />
      </div>
    </div>
  );
};

export default GridTask;
