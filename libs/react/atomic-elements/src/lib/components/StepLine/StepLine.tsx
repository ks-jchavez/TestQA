import React from 'react';
import { clone, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import { generalBaseOptions } from '../generalBaseOptions';
import { getOptions } from './options';

export const StepLine = (props: HighchartsReact.Props): JSX.Element | null => {
  const results = pathOr([], ['context', 'data', 'results'], props);
  const format = pathOr({}, ['context', 'data', 'format'], props);

  const containerProps = pathOr({}, ['containerProps'], props);
  const options = getOptions(results, format, generalBaseOptions, props.params);

  const containerSettings = { ...containerProps, style: { height: '100%', width: '100%' } };

  if (props.context.isLoading) {
    return <Loader />;
  }

  return options !== null ? (
    <HighchartsReact
      highcharts={Highcharts}
      options={clone(options)}
      {...props}
      containerProps={containerSettings}
    />
  ) : null;
};

export default React.memo(StepLine);
