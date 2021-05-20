import './ReadOnlyText.scss';

import React, { ReactElement } from 'react';

import { DataProps } from '../../../types';
import { Loader } from '@kleeen/react/components';
import classnames from 'classnames';
import { pathOr } from 'ramda';
import { isNilOrEmpty } from '@kleeen/common/utils';

interface ReadOnlyTextProps {
  context: any;
  fullscreen?: boolean;
}

export const ReadOnlyText = (props: ReadOnlyTextProps): ReactElement => {
  const { fullscreen } = props;
  const isLoading = pathOr(true, ['context', 'isLoading']);
  const data: DataProps[] = pathOr([], ['context', 'data'], props);
  const resultsByTransformation = isNilOrEmpty(data) ? [] : data;
  const result = pathOr('', [0, 'results'], resultsByTransformation);

  if (isLoading(props)) {
    return <Loader />;
  }

  return <div className={classnames('read-only-text', { fullscreen })}>{result}</div>;
};

export default React.memo(ReadOnlyText);
