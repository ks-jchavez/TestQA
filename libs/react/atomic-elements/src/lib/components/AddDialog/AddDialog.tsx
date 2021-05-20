import { AttributeInputEvents, useEntityDetailsEventHandler, useTheme } from '@kleeen/react/hooks';
import { BaseAddDialogProps, KsButton } from '@kleeen/react/components';
import React, { MouseEvent, useEffect } from 'react';

import { ConfigInputWidget } from '../Widgets';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dialog as KsDialog } from './AddDialog.styles';
import capitalize from 'lodash.capitalize';
import { startCase } from 'lodash';

interface BuildEntityProps {
  attributeEventList: AttributeInputEvents[];
  entityKey: string;
}

const CreateFormField = ({
  attr,
  registerEvents,
  taskName,
}: {
  attr: { name: string; canAddValues?: boolean };
  registerEvents: (event: any) => void;
  taskName: string;
}) => {
  const configInputAttr = [
    {
      canAddValues: attr.canAddValues ?? true,
      format: {
        aggregations: null,
        dateTime: null,
        examples: null,
        valueLabels: null,
        max: null,
        min: null,
        prefix: null,
        severityBad: null,
        severityGood: null,
        severityLevels: null,
        suffix: null,
      },
      formatType: 'text',
      hasMany: null,
      label: `Display value of ${startCase(attr.name)}`,
      name: attr.name,
      rawEntityName: attr.name,
    },
  ];

  return (
    <div style={{ minWidth: 'calc(var(--wh-9XL) - var(--wh-S) - var(--wh-4XS))' }}>
      <ConfigInputWidget
        taskName={taskName}
        title={''}
        widgetId={attr.name}
        attributes={configInputAttr as any}
        icon={false}
        disabled={false}
        hideSaveAndClose={true}
        hideTitle={true}
        inSummaryDetails={true}
        registerEvents={registerEvents}
        statisticalType={'Data - Categorical - free form' as any}
      />
    </div>
  );
};

const buildEntity = ({ attributeEventList, entityKey }: BuildEntityProps) => {
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

  const rawForm = Object.entries(data?.params)
    .filter(([, values]) => values)
    .map(([key, value]: any) => [key, value]);

  const form = rawForm.reduce((acc: Record<string, any>, [key, value]) => {
    if (key === entityKey) {
      acc.displayValue = value.displayValue;
    }
    acc[key] = value;
    return acc;
  }, {});

  return form;
};

export function AddDialog({
  attributes,
  open,
  onAction,
  onClose,
  parent,
  title,
  taskName,
}: BaseAddDialogProps): JSX.Element {
  const { themeClass } = useTheme();
  const [attributeEventList, { addEvent, clearEventList }] = useEntityDetailsEventHandler();

  useEffect(() => {
    return clearEventList;
  }, []);

  const registerEvents = (event: AttributeInputEvents): void => {
    addEvent(event);
  };

  const onSave = (e: MouseEvent): void => {
    const entityKey = attributes[0]?.name;
    const form = buildEntity({
      entityKey,
      attributeEventList,
    });
    const isFormValid = Object.keys(form).includes(entityKey);
    const payload = {
      entity: form,
      parent,
      entityKey,
    };

    if (!isFormValid) return;

    onAction(e, payload);
    onClose();
  };

  function handleClose(): void {
    onClose();
  }

  return (
    <KsDialog aria-labelledby="form-dialog-title" className={themeClass} onClose={handleClose} open={open}>
      <DialogTitle id="form-dialog-title">{capitalize(title)}</DialogTitle>
      <DialogContent>
        {attributes.map((attr) => (
          <div style={{ marginBottom: 'var(--pm-S)' }}>
            <CreateFormField
              attr={attr}
              key={attr.name}
              taskName={taskName}
              registerEvents={registerEvents}
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <KsButton onClick={handleClose}>Cancel</KsButton>
        <KsButton color="primary" onClick={onSave}>
          {title}
        </KsButton>
      </DialogActions>
    </KsDialog>
  );
}
