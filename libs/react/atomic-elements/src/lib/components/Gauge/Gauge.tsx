import './Gauge.scss';

import { ValuesProps, VizCommonParams, getFullLabel } from '../../../types';
import { clone, isEmpty, isNil, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { TextFormatter } from '@kleeen/react/components';
import { getOptions } from './options';
import more from 'highcharts/highcharts-more';

more(Highcharts);

const hideLabelFormatTypes = ['severity_level'];

function shouldHideLabel(formatType: string): boolean {
  return formatType && hideLabelFormatTypes.includes(formatType);
}

export const Gauge = ({
  containerProps,
  context,
  ...rest
}: HighchartsReact.Props & VizCommonParams): JSX.Element => {
  if (context.isLoading) {
    return <Loader />;
  }

  const beFormat = pathOr({}, ['data', 0, 'format'], context);
  const ksFormat = pathOr({}, ['params', 'value', 'format'], rest);
  const format = isNil(beFormat) || isEmpty(beFormat) ? ksFormat : beFormat;
  const results = pathOr([], ['data', 0, 'results'], context);
  const transformation = pathOr({}, ['data', 0, 'transformation'], context);
  const params = rest.params;

  const options = getOptions({ results, format, params });

  const { value } = params;
  const hideLabel = shouldHideLabel(value?.formatType);
  const gaugeWidth = hideLabel ? '100%' : '50%';
  const containerPropsPlus = { ...containerProps, style: { height: '100%', width: gaugeWidth } };
  const labelTransformation = pathOr('', ['transformations', 0, 'transformation'], value);
  const fullLabel = getFullLabel({
    label: (value as ValuesProps)?.label,
    transformation: labelTransformation,
  });

  return (
    <div className="gauge-container">
      <HighchartsReact
        containerProps={containerPropsPlus}
        highcharts={Highcharts}
        options={clone(options)}
        {...rest}
      />
      {!hideLabel && (
        <div className="gauge-value">
          <TextFormatter format={format} transformation={transformation} formatType={value?.formatType}>
            {results}
          </TextFormatter>
          <p>{fullLabel}</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(Gauge);
