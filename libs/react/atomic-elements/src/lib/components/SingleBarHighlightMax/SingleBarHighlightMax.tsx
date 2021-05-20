import './SingleBarHighlightMax.scss';

import { CrossLinkingProps, useCrossLinkingMenuOnViz, useTextFormattersForViz } from '@kleeen/react/hooks';
import { KsButton, Loader } from '@kleeen/react/components';
import React, { useState } from 'react';
import { axisStyle, generalBaseOptions } from '../generalBaseOptions';
import { backToClick, deltaOfResults, localization, singleBarOptions } from './options';
import { clone, has, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IDeltaResults } from './interfaces';
import { KUIConnect } from '@kleeen/core-react';
import drilldown from 'highcharts/modules/drilldown';
import merge from 'lodash.merge';

drilldown(Highcharts);

const SLICE_RESULTS_BY = 12;
const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  yAxis: {
    crosshair: {
      color: 'var(--primary-color)',
    },
  },
} as Highcharts.Options);

function SingleBarHighlightMaxBase({ translate, ...props }: HighchartsReact.Props): React.ReactElement {
  const [highChartUpdate, sethighChartUpdate] = useState({
    drillUp: null,
    drillUpButton: {},
    plotSizeX: 0,
    series: [],
    xAxis: [],
  });

  const [formatterGroupBy, formatterGroupByForTooltip, formatterValue] = useTextFormattersForViz(
    props.params,
  );
  const widgetId = pathOr('', ['widgetId'], props);
  const results = pathOr([], ['context', 'data', 'results'], props);
  const format = pathOr({}, ['context', 'data', 'format'], props);
  const containerProps = pathOr({}, ['containerProps'], props);
  const sliceResultsBy = pathOr(SLICE_RESULTS_BY, ['sliceResultsBy'], props); //split results based on sliceResultsBy integer
  const labels = pathOr({}, ['xAxis', 'labels'], format);
  const xAxis = clone(pathOr({}, ['xAxis'], format));
  const yAxis = pathOr({}, ['yAxis'], format);
  const backButtonRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
  const containerSettings = { ...containerProps, style: { height: '100%', width: '100%' } };
  const vizColors: string[] = generalBaseOptions.colors.slice(0, 10);
  const otherButtonColor = 'var(--on-surface-color)';

  if (!has('key', xAxis)) {
    xAxis['key'] = widgetId;
  }
  const {
    crossLinkingValuesForAxis,
    openMenuIfCrossLink,
  } = useCrossLinkingMenuOnViz(props as CrossLinkingProps, { xAxis });

  let firstSliceOfResults: Array<IDeltaResults> = [];
  const xAxisCategories = clone(xAxis.categories);
  let secondHalfOfResults: Array<IDeltaResults> = [];

  if (deltaOfResults(results, vizColors, crossLinkingValuesForAxis, xAxis).length > sliceResultsBy * 2) {
    secondHalfOfResults = deltaOfResults(results, vizColors, crossLinkingValuesForAxis, xAxis).slice(
      sliceResultsBy,
      results.length - 1,
    );

    const sum: number = secondHalfOfResults.reduce((a, b) => {
      return a + b.y;
    }, 0);
    const averageSecondHalfOfResults: number = Math.round(sum / secondHalfOfResults.length) || 0;

    xAxisCategories?.splice(sliceResultsBy, 0, localization(translate).restOfResultsLabel);
    firstSliceOfResults = deltaOfResults(results, vizColors, crossLinkingValuesForAxis, xAxis).slice(
      0,
      sliceResultsBy,
    );
    firstSliceOfResults.push({
      name: localization(translate).restOfResultsLabel,
      y: averageSecondHalfOfResults,
      drilldown: localization(translate).restOfResultsLabel,
    });
  } else {
    firstSliceOfResults = deltaOfResults(results, vizColors, crossLinkingValuesForAxis, xAxis);
  }

  const options = singleBarOptions(
    widgetId,
    translate,
    sliceResultsBy,
    baseOptions,
    xAxis,
    xAxisCategories,
    labels,
    formatterGroupBy,
    yAxis,
    formatterValue,
    formatterGroupByForTooltip,
    otherButtonColor,
    axisStyle,
    secondHalfOfResults,
    firstSliceOfResults,
    openMenuIfCrossLink,
  );

  if (props.context.isLoading) {
    return <Loader />;
  }

  return (
    <div className="singlebar-hightlightmax-container">
      <div
        ref={backButtonRef}
        className="back-to"
        id={`singlebar-hightlightmax-${widgetId}-container__backButton`}
      >
        <KsButton
          onClick={() => {
            backToClick(highChartUpdate, xAxis, sliceResultsBy, translate, backButtonRef);
          }}
        >
          ◁ {localization(translate).backTo}
        </KsButton>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={clone(options)}
        {...props}
        containerProps={containerSettings}
        callback={(e) => {
          sethighChartUpdate(e);
        }}
      />
    </div>
  );
}

const SingleBarHighlightMax = React.memo(
  KUIConnect(({ translate }) => ({ translate }))(SingleBarHighlightMaxBase),
);
export { SingleBarHighlightMax, SingleBarHighlightMax as default };
