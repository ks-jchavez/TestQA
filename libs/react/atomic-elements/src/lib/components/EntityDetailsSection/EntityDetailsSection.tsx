import './EntityDetailsSection.scss';

import { AttributeInputEvents, useEntityDetailsEventHandler, useKleeenActions } from '@kleeen/react/hooks';
import { KsButton, KsMenuContainer } from '@kleeen/react/components';
import React, { ReactElement, useEffect, useState } from 'react';
import { makeStyles, styled } from '@material-ui/core';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { ConfigInputWidget } from '../Widgets';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { HeaderTitle } from '../HeaderTitle';
import { KUIConnect } from '@kleeen/core-react';
import MuiButton from '@material-ui/core/Button';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTooltip from '@material-ui/core/Tooltip';
import MuiTypography from '@material-ui/core/Typography';
import ReadOnlyTextField from '../ReadOnlyTextField/ReadOnlyTextField';
import { Slot } from '../DetailSummary/DetailSummary.model';

export interface EntityDetailsSectionProps {
  translate?: (e) => string;
  entityName: string;
  onChangeFilterVisible?: Function;
  entityDetails: any[];
  taskName: string;
  displayTaskName: string;
  isEditable: boolean;
  headerTitle?: ReactElement;
  slots?: Slot[];
}

const Paper = styled(KsMenuContainer)({
  borderRadius: 0,
});

const Button = styled(MuiButton)({
  boxShadow: 'none',
  width: 'var(--wh-1XL)',
  '&:hover': {
    boxShadow: 'none',
  },
});

const Toolbar = styled(MuiToolbar)({
  backgroundColor: 'var(--surface-color)',
  'border-radius': 'var(--pm-0)',
  display: 'flex',
  justifyContent: 'center',
});

const useStyles = makeStyles(() => ({
  drawerClose: {
    height: '100%',
    overflowX: 'hidden',
    alignItems: 'center',
    width: 'var(--wh-1XS)',
    borderRadius: 'var(--card-border-radius)',
    border: 'var(--card-border)',
  },
  iconEntity: {
    margin: 'var(--pm-4XS)',
    width: 'var(--wh-2XS)',
    backgroundColor: 'var(--secondary-color)',
    borderRadius: 'var(--wh-4XS)',
    '&.MuiSvgIcon-root': {
      color: 'var(--on-secondary-color)',
    },
    '&:hover': {
      backgroundColor: 'var(--secondary-color-variant)',
      color: 'var(--on-secondary-color-variant)',
      cursor: 'pointer',
    },
  },
}));

const Typography = styled(MuiTypography)({
  color: 'var(--page-intro-text-color)',
}) as typeof MuiTypography;

export const AttributesEditor = (props) => {
  return (
    <div className="attributes-editor">
      <div className="attributes-editor-header">
        <Typography className="L2TitleSection">{props.entityName}</Typography>
        <Typography className="L3TitleSection">{props.entityDescription}</Typography>
      </div>
      <div className="attributes-editor-body">
        {props.entityDetails.map((widget) => {
          const { readOnly, statisticalType } = widget;

          return (
            <div
              key={widget.id}
              className={`config-widget-container ${widget.fullWidth ? 'full-width-cell' : ''}`}
            >
              {readOnly ? (
                <ReadOnlyTextField
                  params={widget.params}
                  attributes={widget.attributes}
                  taskName={props.taskName}
                  widgetId={widget.id}
                />
              ) : (
                <ConfigInputWidget
                  taskName={props.taskName}
                  title={'test' + widget.params.value.name}
                  widgetId={widget.id}
                  params={widget.params}
                  attributes={widget.attributes}
                  icon={false}
                  disabled={!props.isEditing}
                  hideSaveAndClose={true}
                  hideTitle={true}
                  inSummaryDetails={true}
                  registerEvents={props.registerEvents}
                  statisticalType={statisticalType}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const EntityDetailsSectionBase = ({
  translate,
  ...props
}: EntityDetailsSectionProps): ReactElement => {
  const [attributeEventList, { addEvent, clearEventList }] = useEntityDetailsEventHandler();
  const { updateRequest } = useKleeenActions(props.taskName);
  const [open, setOpen] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const classes = useStyles();
  const propsHeader = {
    title: props.displayTaskName,
    objectValue: props.slots[0].params.baseModel,
    slots: props.slots,
    taskName: props.taskName,
  };
  useEffect(() => {
    return clearEventList;
  }, []);

  const registerEvents = (event: AttributeInputEvents): void => {
    addEvent(event);
  };

  const onSave = (): void => {
    const widgetsData = attributeEventList.map((event) => event.onSave()).filter((data) => data);
    const data = widgetsData.reduce((previous: any, current: any) => {
      return {
        ...current,
        params: {
          ...previous.params,
          ...current.params,
        },
      };
    }, {});

    updateRequest(data);
  };

  const handleDrawerOpen = (): void => {
    setOpen(true);
    props.onChangeFilterVisible && props.onChangeFilterVisible(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
    props.onChangeFilterVisible && props.onChangeFilterVisible(false);
  };

  return open ? (
    <Paper className={'entity-details-section'} elevation={3}>
      <div className="paper-container">
        <div className="attributes-container">
          <div className="attributes-navigation">
            <KsButton className="attributes-navigation-left" onClick={handleDrawerClose}>
              <ArrowLeftIcon className="icon-close" />
              {translate('app.subHeader.buttonSummary.summaryDetails')}
            </KsButton>
            {props.isEditable && (
              <KsButton
                className={
                  'attributes-navigation-right ' + (isEditing ? 'attributes-navigation-edit-on' : '')
                }
                onClick={() => setEditing(!isEditing)}
              >
                {isEditing
                  ? translate('app.subHeader.container.button.editOff')
                  : translate('app.subHeader.container.button.editOn')}
              </KsButton>
            )}
          </div>

          <AttributesEditor
            entityName={HeaderTitle(propsHeader, false)}
            entityDescription={props.entityName}
            registerEvents={registerEvents}
            entityDetails={props.entityDetails}
            taskName={props.taskName}
            isEditing={isEditing}
          />
        </div>
        {isEditing && (
          <Toolbar>
            <Button className="primary-button" onClick={onSave}>
              {translate('app.subHeader.container.button.save')}
            </Button>
          </Toolbar>
        )}
      </div>
    </Paper>
  ) : (
    <Paper elevation={3} className={classes.drawerClose}>
      <MuiTooltip title="View your entity" placement="top">
        <EditOutlinedIcon className={classes.iconEntity} onClick={handleDrawerOpen} />
      </MuiTooltip>
    </Paper>
  );
};

export const EntityDetailsSection = KUIConnect(({ translate }) => ({ translate }))(EntityDetailsSectionBase);
