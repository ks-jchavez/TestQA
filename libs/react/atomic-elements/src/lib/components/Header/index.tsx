import './Header.scss';

import { ActionsManagerProps, RefreshControl, useKsActionsManager } from '@kleeen/react/components';
import React, { ReactElement } from 'react';

import { isEmpty } from 'ramda';
import { useStyles } from './Header.style';

export function KsHeader(props: {
  actionsProps: ActionsManagerProps;
  hideRefreshControl: boolean;
  onRefresh: () => void;
  subTitle?: string;
  title: string | JSX.Element;
  upText?: string;
}): ReactElement {
  const { KsActionDialogs, KsActionsSection } = useKsActionsManager(props.actionsProps);
  const classes = useStyles(props);
  const { actions } = props.actionsProps;

  return (
    <>
      <header className={`main-header ${classes.header} dataview`}>
        <div className={classes.infoContainer}>
          <h5 className={classes.withoutMargin}>{props.upText}</h5>
          <h3 className={classes.mainTitle}>{props.title}</h3>
          <h5 className={classes.withoutMargin}>{props.subTitle}</h5>
        </div>
        <div className="refresh-control-header">
          {!props.hideRefreshControl && <RefreshControl onRefresh={props.onRefresh} />}
        </div>
        {!isEmpty(actions) && <div className={classes.actionsContainer}>{KsActionsSection}</div>}
      </header>
      {KsActionDialogs}
    </>
  );
}
