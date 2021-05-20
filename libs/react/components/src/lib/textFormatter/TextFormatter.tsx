import './TextFormatter.scss';

import { AggregationType, FormatProps, SameSDTAggregations } from '@kleeen/types';
import { getColorForSeverityValues } from '@kleeen/frontend/utils';
import { isNilOrEmpty } from '@kleeen/common/utils';

import KsFilledCircle from '../ksFilledCircle/ksFilledCircle';
import React from 'react';
import { TextFormatterProps } from './TextFormat.model';
import { isNil } from 'ramda';
import { useTextFormatter } from '@kleeen/react/hooks';

/**
 * Rounds with decimal precision.
 * @param number The number to round.
 * @param decimalPlaces The number of decimal places to maintain.
 * @example
 * // 45.36
 * decimal(45.3596);
 */
function toDecimalPlaces(number: number, decimalPlaces = 2): number {
  if (!Number.isFinite(number)) {
    return 0;
  }
  const powDecimal = Math.pow(10, decimalPlaces);
  return Math.round(number * powDecimal) / powDecimal;
}

function getPercentage(value: number, format: FormatProps) {
  const max = format.max + 1;
  const min = format.min + 1;
  return Math.abs(((value - min) * 100) / (max - min));
}

const FormattedSeverityValue = ({
  children,
  format,
  transformation,
  textAlignment,
  formatType,
  formatter,
  hasDisplayMedia,
}): JSX.Element => {
  const { severityLevels, severityGood, severityBad } = format;
  const hasSeverityColorFormat =
    !(isNil(severityLevels) && isNil(severityGood) && isNil(severityBad)) &&
    SameSDTAggregations.includes(transformation as AggregationType);

  if (!hasSeverityColorFormat) return formatter(children);

  const value = children as number | string;
  const color = getColorForSeverityValues(value, format, transformation);

  return (
    <div className={'text-formatter-root'} style={{ justifyContent: textAlignment }}>
      {!hasDisplayMedia && (
        <KsFilledCircle
          color={color}
          percentage={formatType?.toString() === 'severity_score' ? getPercentage(children, format) : 100}
        />
      )}
      <span className={'text-formatter'} style={{ color, textTransform: 'capitalize' }}>
        {formatter(children)}
      </span>
    </div>
  );
};

export const TextFormatter = ({
  children,
  format,
  transformation = '',
  formatType = '',
  textAlignment = 'left',
  hasDisplayMedia = false,
}: TextFormatterProps): JSX.Element => {
  if (isNilOrEmpty(format)) return <>{children}</>;

  const { isNumericType } = format;
  const [formatter] = useTextFormatter({ format, formatType, transformation });
  const results = isNumericType ? toDecimalPlaces(Number(children)) : children;

  if (['severity_score', 'severity_level'].includes(formatType)) {
    return (
      <FormattedSeverityValue
        format={format}
        transformation={transformation}
        textAlignment={textAlignment}
        formatType={formatType}
        formatter={formatter}
        hasDisplayMedia={hasDisplayMedia}
      >
        {results}
      </FormattedSeverityValue>
    );
  }

  return <>{formatter(results)}</>;
};

export default React.memo(TextFormatter);
