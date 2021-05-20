import { IntlShape, createIntl, createIntlCache } from '@formatjs/intl';
import { Language, useLocalization } from './useLocalization';

import { FormatProps } from '@kleeen/types';
import { ReactNode } from 'react';

interface UseTextFormatterProps {
  format: FormatProps;
  formatType: string;
  transformation?: string;
}

const cache = createIntlCache();
let globalIntl: IntlShape<string>;
let globalLocale: Language;

const getIntl = (lang: Language): IntlShape<string> => {
  if (!globalIntl || lang !== globalLocale) {
    globalIntl = createIntl({ locale: lang }, cache);
    globalLocale = lang;
  }
  return globalIntl;
};

const formatNumber = {
  average: 'formatNumber',
  min: 'formatNumber',
  max: 'formatNumber',
  sum: 'formatNumber',
  latest: 'formatNumber',
  oldest: 'formatNumber',
  selfSingle: 'formatNumber',
  selfMulti: 'formatNumber',
};

export const kapiTypeFuncMap = {
  USD: {
    ...formatNumber,
  },
  percent: {
    ...formatNumber,
  },
  timestamp: 'formatDate',
};

export const kapiTypeDefaultPropsMap = {
  USD: { style: 'currency', currency: 'USD' },
  timestamp: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  },
  percent: { style: 'percent', maximumFractionDigits: 2 },
};

export const useTextFormatter = (
  textFormatter: UseTextFormatterProps,
  textFormatDefault?: string,
): [(value: ReactNode) => ReactNode] => {
  const { format, formatType, transformation = 'selfSingle' } = textFormatter;
  let kapiFuncMap = kapiTypeFuncMap[formatType];

  if (typeof kapiFuncMap === 'object') {
    kapiFuncMap = kapiFuncMap[transformation];
  }

  if (!kapiFuncMap) {
    return [(value: ReactNode) => value];
  }

  const { language } = useLocalization();
  const intl = getIntl(language);
  const formatDefault = textFormatDefault || kapiTypeDefaultPropsMap[formatType];
  const formatToUse = formatType === 'timestamp' && format?.dateTime ? format.dateTime : formatDefault;

  const transformValueBasedOnFormatType = (value: ReactNode): ReactNode =>
    formatType === 'percent' ? Number(value) / 100 : value;
  const formatter = (value: ReactNode): ReactNode =>
    intl[kapiFuncMap](transformValueBasedOnFormatType(value), formatToUse);

  return [formatter];
};
