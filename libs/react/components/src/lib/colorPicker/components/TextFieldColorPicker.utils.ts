import { Helpers } from '@kleeen/render-utils';
import { isNilOrEmpty } from '@kleeen/common/utils';
import tinycolor from 'tinycolor2';
const FAIL_SAFE_COLOR = '#000000';

const getThemeColor = (): string => {
  const appThemeColor = Helpers.DOM.getAppSecondaryColor();
  if (!isNilOrEmpty(appThemeColor)) {
    return appThemeColor.startsWith('#') ? appThemeColor : tinycolor(appThemeColor).toHexString();
  }
  return FAIL_SAFE_COLOR;
};
export { getThemeColor };
