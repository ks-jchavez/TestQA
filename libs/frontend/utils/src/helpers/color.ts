import tinycolor from 'tinycolor2';

export const isValidColor = (color: string): boolean => {
  const tColor = tinycolor(color);
  return tColor.isValid();
};

export const exportColorToHex = (color: string): string => {
  const tColor = tinycolor(color);
  return tColor.toHexString();
};

export const darkenColor = (color: string, amount: number): string => {
  const tColor = tinycolor(color);
  return tColor.darken(amount);
};
