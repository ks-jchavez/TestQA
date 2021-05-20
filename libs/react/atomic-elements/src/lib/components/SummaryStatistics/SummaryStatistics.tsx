import './SummaryStatistics.scss';

import { DataProps, ValuesProps } from '../../../types';
import Grid, { GridSize } from '@material-ui/core/Grid';
import React, { ReactElement } from 'react';

import CardDetail from './CardDetail/CardDetail';
import { Loader } from '@kleeen/react/components';
import { SummaryStatisticsProps } from './SummaryStatistics.model';
import classnames from 'classnames';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { pathOr } from 'ramda';
import { useTheme } from '@kleeen/react/hooks';

export const SummaryStatistics = (props: SummaryStatisticsProps): ReactElement => {
  const isLoading = pathOr(true, ['context', 'isLoading']);
  const { isWidget } = props;
  const { theme } = useTheme();
  const resultsByTransformationPre: DataProps[] = pathOr([], ['context', 'data'], props);
  const resultsByTransformation = isNilOrEmpty(resultsByTransformationPre) ? [] : resultsByTransformationPre;

  const values: ValuesProps = pathOr({}, ['values'], props);
  const column = Math.round(resultsByTransformation.length / 3);
  if (isLoading(props)) {
    return <Loader />;
  }

  const gridSize = (key: number, length: number): GridSize => {
    if (key == 0 || length == 2) {
      return 12;
    } else {
      if ((length - 1) % 2 == 0 || ((key == 1 || key == 2) && length == 6)) {
        return 6;
      } else {
        return 4;
      }
    }
  };

  const classToUse = isWidget ? 'widget' : 'visualization';

  return (
    <Grid className={classnames('summary-statistics', 'flavor-' + theme.flavor, classToUse)} container>
      {resultsByTransformation.map((transformationResults, key) => {
        return (
          <Grid
            key={key}
            item
            xs={gridSize(key, resultsByTransformation.length)}
            className={classnames(
              key === 0 ? 'statistics-primary' : 'statistics-secondary',
              column !== 0 ? 'columns-size-' + column : '',
            )}
          >
            <CardDetail
              attribute={props.attribute}
              label={values.label}
              results={transformationResults}
              transformation={values.transformations[key]}
              {...props}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default React.memo(SummaryStatistics);
