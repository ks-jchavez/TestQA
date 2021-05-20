import { AggregationType, Attribute, WidgetDataAttributes } from '@kleeen/types';
import { isEmpty, isNil, path, pathOr } from 'ramda';
import { useTextFormatter, useWidgetContext } from '@kleeen/react/hooks';

import { Arrow } from '../Arrow/Arrow';
import { Loader } from '@kleeen/react/components';
import MuiTooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { StyledTextField } from './ReadOnlyTextField.style';
import { getColorForSeverityValues } from '@kleeen/frontend/utils';

interface ReadOnlyTextFieldProps {
  attributes?: Attribute[];
  disableUnderline?: boolean;
  params: {
    baseModel: string;
  };
  taskName: string;
  widgetId: string;
}

const ReadOnlyTextField = ({
  attributes,
  disableUnderline = true,
  params,
  taskName,
  widgetId,
}: ReadOnlyTextFieldProps): JSX.Element => {
  const widgetData = useWidgetContext({ taskName, widgetId, params: { ...params, attributes } });
  const attrName = widgetData && path(['0', 'name'], attributes);
  const attrLabel = widgetData && path(['0', 'label'], attributes);
  const changeDirections = pathOr({}, ['0', 'aggregationMetadata', 'changeDirections'], attributes);
  const value = pathOr('', ['data', 'data', '0', attrName, WidgetDataAttributes.DisplayValue], widgetData);
  const beFormat = pathOr({}, ['data', 'format', attrName], widgetData);
  const ksFormat = pathOr({}, ['value', 'format'], params);
  const format = isNil(beFormat) || isEmpty(beFormat) ? ksFormat : beFormat;
  const transformation = pathOr('', ['value', 'transformation'], params);
  const severityColor = getColorForSeverityValues(value, format, transformation);
  const formatType = pathOr('', ['value', 'formatType'], params);
  const [formatter] = useTextFormatter({ format, formatType, transformation });
  const isChangeTransformation = [AggregationType.ChangePercent, AggregationType.ChangeCount].includes(
    transformation,
  );

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <MuiTooltip
      placement="top"
      title={
        <>
          {attrLabel}:
          <br />
          {formatter(value) || ''}
        </>
      }
    >
      {isChangeTransformation ? (
        <StyledTextField
          disabled
          InputProps={{
            disableUnderline,
            inputComponent: Arrow,
            inputProps: {
              value,
              transformation: {
                isPrimary: false,
                transformation,
                transformationMetadata: { changeDirections },
                metadata: { changeDirections },
              },
            },
          }}
          label={attrLabel}
          value={formatter(value)}
          inputProps={{ style: { color: severityColor } }}
        />
      ) : (
        <StyledTextField
          disabled
          InputProps={{ disableUnderline }}
          label={attrLabel}
          value={formatter(value)}
          inputProps={{ style: { color: severityColor } }}
        />
      )}
    </MuiTooltip>
  );
};

export default ReadOnlyTextField;
