import './Sparklines.scss';

import React, { ReactElement, useEffect, useState } from 'react';

import { KUIConnect } from '@kleeen/core-react';
import { Line } from './Line/Line';
import { Pie } from './Pie/Pie';
import { Trend } from './Trend/Trend';
import { isNilOrEmpty, generateUniqueId } from '@kleeen/common/utils';
import { pathOr } from 'ramda';
import classnames from 'classnames';

const components = {
  Line,
  Pie,
  Trend,
};

function SparklinesBase({ translate, ...props }): ReactElement {
  const transformationType = pathOr('', ['transformationType'], props);
  const isPrimary = pathOr(false, ['isPrimary'], props);
  const transformationLabel =
    pathOr(transformationType, ['transformationLabel'], props) || transformationType;
  const visualizationType = pathOr('Trend', ['visualizationType'], props);

  const VisualisationComponent = components[visualizationType];
  const [visItemHeight, setVisItemHeight] = useState(0);
  const uniqueId = generateUniqueId('id');

  useEffect(() => {
    const visEl: HTMLElement = document.querySelector(`.sparklines-container-${uniqueId}`);
    const transfEl: HTMLElement = document.querySelector(`.transformation-label-${uniqueId}`);
    if (!isNilOrEmpty(visEl?.offsetHeight) && !isNilOrEmpty(transfEl?.offsetHeight)) {
      const newVisItemHeight: number = Math.floor(visEl?.offsetHeight - transfEl?.offsetHeight - 10);
      setVisItemHeight(newVisItemHeight);
    }
  }, []);

  return (
    <div
      className={classnames(['sparklines-container', ` sparklines-container-${uniqueId}`], {
        'sparklines-container--is-primary': isPrimary,
      })}
    >
      <div className={`transformation-label transformation-label-${uniqueId}`}>
        {transformationLabel.toString().trim()}
      </div>
      <VisualisationComponent containerHeight={visItemHeight} {...props} />
    </div>
  );
}
const Sparklines = React.memo(KUIConnect(({ translate }) => ({ translate }))(SparklinesBase));
export { Sparklines, Sparklines as default };
