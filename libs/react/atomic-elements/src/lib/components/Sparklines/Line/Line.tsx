import React, { ReactElement } from 'react';
import { clone, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { KUIConnect } from '@kleeen/core-react';
import { generalBaseOptions } from '../../generalBaseOptions';
import { getOptions } from '../globalOptions';
import merge from 'lodash.merge';

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {} as Highcharts.Options);

function LineBase({ translate, ...props }: HighchartsReact.Props): ReactElement {
  const results = pathOr([], ['context', 'data', 'results'], props);
  const containerProps = pathOr({}, ['containerProps'], props);
  const options = getOptions(baseOptions);

  const lineOptions: Highcharts.Options = merge({}, options, {
    chart: {
      type: 'line',
    },
  } as Highcharts.Options);

  const containerSettings = {
    ...containerProps,
    style: { height: '100%', width: '100%' },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={clone(lineOptions)}
      {...props}
      containerProps={containerSettings}
    />
  );
}
const Line = React.memo(KUIConnect(({ translate }) => ({ translate }))(LineBase));
export { Line };
