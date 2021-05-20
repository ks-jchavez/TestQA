import './Pie.scss';

import React, { ReactElement } from 'react';
import { clone, path, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { KUIConnect } from '@kleeen/core-react';
import classnames from 'classnames';
import { generalBaseOptions } from '../../generalBaseOptions';
import { getOptions } from '../globalOptions';
import { isValidArray } from '@kleeen/common/utils';
import merge from 'lodash.merge';

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {} as Highcharts.Options);

function PieBase({ translate, ...props }: HighchartsReact.Props): ReactElement {
  const results = pathOr([], ['results', 'results'], props);
  const isPrimary = pathOr(false, ['isPrimary'], props);
  const maxResultsValue: number = isValidArray(results) && results[0];
  const containerHeight = path(['containerHeight'], props);
  const containerProps = pathOr({}, ['containerProps'], props);
  const options = getOptions(baseOptions);

  const PieOptions: Highcharts.Options = merge({}, options, {
    chart: {
      type: 'pie',
      plotBorderWidth: null,
      margin: [0, 0, 0, 0],
      spacing: [0, 0, 0, 0],
    },
    plotOptions: {
      ...baseOptions.plotOptions,
      pie: {
        size: containerHeight ? containerHeight : undefined,
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        data: results,
      },
    ],
  } as Highcharts.Options);

  const containerSettings = {
    ...containerProps,
    style: { height: '100%', width: '33%' },
  };
  return (
    <>
      <div className={classnames('pie-container', { 'pie-container--is-primary': isPrimary })}>
        <HighchartsReact
          highcharts={Highcharts}
          options={clone(PieOptions)}
          {...props}
          containerProps={containerSettings}
        />
        {maxResultsValue && (
          <h2
            className={classnames('pie-container__label', { 'pie-container__label--is-primary': isPrimary })}
          >
            {maxResultsValue}
          </h2>
        )}
      </div>
    </>
  );
}
const Pie = React.memo(KUIConnect(({ translate }) => ({ translate }))(PieBase));
export { Pie };
