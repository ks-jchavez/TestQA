import './RefreshControlSection.scss';

import { Button, Container, Title, Typography } from './refreshControlSection.styles';
import React, { ReactElement, useState } from 'react';
import { useKleeenActions } from '@kleeen/react/hooks';

import Grid from '@material-ui/core/Grid';
import LinearProgressBar from '../LinearProgressBar/LinearProgressBar';
import { SelectList } from '../SelectList/SelectList';
import { TimeIntervals } from '@kleeen/types';

export interface RefreshControlSectionProps {
  actions?: Action[];
  attributes: Attribute[];
  entityActions?: any[];
  description?: string;
  entity?: string;
  title?: string;
  showActions: boolean;
  showAvatar: boolean;
  showDesc: boolean;
  showTitle: boolean;
  taskName: string;
}

interface Action {
  type: string;
  label?: string;
}

interface Attribute {
  name: string;
  type?: string;
}

const AvatarSection = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect id="blue_square" fill="#069" x="0" y="0" width="100%" height="100%" />
    </svg>
  );
};

// Select And Execute
const SelectedStatsSection = (props: { actions: Action[]; time; setTime }) => {
  return (
    <SelectList
      id="select-refresh-time"
      label="Refresh..."
      labelId="refresh-time"
      onChange={(value) => {
        props.setTime(value);
      }}
      options={TimeIntervals}
      value={props.time}
    />
  );
};

export const RefreshControlSection = (props: RefreshControlSectionProps): ReactElement => {
  const [time, setTime] = useState(5);
  const [completed, setCompleted] = useState(1);
  const [title, setTitle] = useState('');
  const [timeCurrent, setTimeCurrent] = useState({ h: '00', m: '00', s: '01' });
  const { refreshPage } = useKleeenActions(props.taskName);

  const handleRefresh = (): void => {
    setCompleted(1);
    setTitle('');
    setTimeCurrent({ h: '00', m: '00', s: '01' });
    refreshPage();
  };

  return (
    <>
      <Container maxWidth="xl" className="refresh-control">
        {props.showAvatar && (
          <Grid item xs={4} sm={2}>
            <AvatarSection />
          </Grid>
        )}
        <Grid className="main-container">
          <Title>
            <Typography variant="h2" component="h1">
              {props.title}
            </Typography>
          </Title>
          <LinearProgressBar
            completed={completed}
            setCompleted={setCompleted}
            title={title}
            setTitle={setTitle}
            timeCurrent={timeCurrent}
            setTimeCurrent={setTimeCurrent}
            time={time}
            setTime={setTime}
            refreshPage={refreshPage}
          />
        </Grid>
        <Grid className="actions-container">
          <SelectedStatsSection actions={props.actions} time={time} setTime={setTime} />
          <Button variant="contained" color="primary" onClick={handleRefresh}>
            {'REFRESH'}
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default RefreshControlSection;
