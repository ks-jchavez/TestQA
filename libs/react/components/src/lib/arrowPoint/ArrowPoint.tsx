import './ArrowPoint.scss';

import { ArrowPointProps, ResultProps } from './ArrowPoint.model';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React from 'react';

const ArrowDrop = ({ result }: ResultProps): React.ReactElement => {
  if (result < 0) {
    return <PlayArrowIcon className="arrow-down" viewBox="8.5 5 11 14" />;
  } else if (result > 0) {
    return <PlayArrowIcon className="arrow-up" viewBox="8 5 11 14" />;
  }

  return <PlayArrowIcon className="arrow-neutral"></PlayArrowIcon>;
};

export const ArrowPoint = ({
  changeDirections,
  result,
  className = '',
  showPercentage,
}: ArrowPointProps): React.ReactElement => {
  return (
    <div className={`container-arrow-point ${changeDirections} ${className}`}>
      <ArrowDrop result={result} />
      {`${Math.abs(result)}${showPercentage ? '%' : ''}`}
    </div>
  );
};
