import { AggregationType } from '@kleeen/types';
import { ArrowPoint } from '@kleeen/react/components';
import { ArrowProps } from './Arrow.model';
import React from 'react';

export const Arrow = (props: ArrowProps) => {
  const metadata = props.transformation.metadata || props.transformation.transformationMetadata;
  const { changeDirections } = metadata || {};
  const isChangePercentage = props.transformation.transformation === AggregationType.ChangePercent;

  return (
    <ArrowPoint
      showPercentage={isChangePercentage}
      changeDirections={changeDirections}
      result={props.value}
      className="arrow-point-center"
    />
  );
};
