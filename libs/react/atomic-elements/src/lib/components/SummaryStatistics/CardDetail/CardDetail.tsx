import './CardDetail.scss';

import { AggregationType, Attribute, Cell, FormatProps, LabelResultsReturnProps } from '@kleeen/types';
import { CardDetailProps, LabelResultsProps } from './CardDetail.model';
import { ContextCell, TextFormatter } from '@kleeen/react/components';
import React, { ReactElement } from 'react';
import { TransformationProps, getAggregationLabel } from '../../../../types';
import { has, isEmpty, isNil, pathOr } from 'ramda';

import { Arrow } from '../../Arrow/Arrow';
import { Sparklines } from '../../Sparklines/Sparklines';
import { SparklinesEnum } from '../../Sparklines/Sparklines.enum';
import Tooltip from '@material-ui/core/Tooltip';
import { generateUniqueId } from '@kleeen/common/utils';
import { useTheme } from '@kleeen/react/hooks';

function labelResults({
  transformation,
  results,
  format,
  formatType,
  textAlignment,
}: LabelResultsProps): LabelResultsReturnProps {
  const labelReturn: LabelResultsReturnProps = {
    results,
    resultsElement: (
      <TextFormatter
        format={format}
        transformation={transformation.transformation}
        formatType={formatType}
        textAlignment={textAlignment}
      >
        {results}
      </TextFormatter>
    ),
  };

  if ([AggregationType.ChangePercent, AggregationType.ChangeCount].includes(transformation.transformation)) {
    labelReturn.results = Math.abs(results as number);
    labelReturn.resultsElement = <Arrow transformation={transformation} value={results as number} />;
  }

  return labelReturn;
}

const applyFormat = (value, attr: Attribute) => {
  const type = attr?.formatType;
  const isAggregated =
    Boolean(attr?.aggregation) &&
    attr?.aggregation !== AggregationType.SelfSingle &&
    attr?.aggregation !== AggregationType.SelfMulti;
  if (isAggregated) return value;
  if (type === 'boolean') return value ? 'True' : 'False';
  return value;
};

/**
 * Section of the widget
 * @param props
 */
export const CardDetail = (props: CardDetailProps): ReactElement => {
  const transformationTemp: TransformationProps = pathOr({}, ['transformation'], props);
  const { transformation, isPrimary } = transformationTemp;
  const crossLinking: any = pathOr({}, ['results', 'crossLinking'], props);
  const attributeHasCrossLinking = props.attribute?.crossLinking?.[0];
  const beFormat: FormatProps = pathOr({}, ['results', 'format'], props);
  const ksFormat: FormatProps = pathOr({}, ['attribute', 'format'], props);
  const format = isNil(beFormat) || isEmpty(beFormat) ? ksFormat : beFormat;
  const formatType: string = pathOr('', ['attribute', 'formatType'], props);
  const { themeClass } = useTheme();

  const showAppliedFormat = applyFormat(props.results?.results, props.attribute) ?? '';

  const { results, resultsElement } = labelResults({
    transformation: transformationTemp,
    results: showAppliedFormat,
    format,
    formatType,
    textAlignment: isPrimary ? 'center' : 'left',
  });

  let label: string = getAggregationLabel(transformation, !isPrimary);

  if (isPrimary) {
    label += ` ${props.label}`;
  }
  const valueAsCell: Cell = { ...crossLinking, displayValue: results };
  return (
    <>
      {has(transformation, SparklinesEnum) ? (
        <Sparklines
          {...props}
          transformationType={transformation}
          visualizationType={SparklinesEnum[transformation]}
          transformationLabel={label}
          key={`sparklines-${generateUniqueId('id')}`}
          isPrimary={isPrimary}
        />
      ) : (
        <div className="card-detail">
          <div className="container">
            <div className="text-overflow-align">
              <p>{label}</p>
              <h2>
                {attributeHasCrossLinking && crossLinking ? (
                  <ContextCell attr={props.attribute} cell={valueAsCell} format={format}></ContextCell>
                ) : (
                  <Tooltip
                    title={resultsElement}
                    placement="bottom"
                    PopperProps={{ className: `MuiTooltip-popper ${themeClass}` }}
                  >
                    <div>{resultsElement}</div>
                  </Tooltip>
                )}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardDetail;
