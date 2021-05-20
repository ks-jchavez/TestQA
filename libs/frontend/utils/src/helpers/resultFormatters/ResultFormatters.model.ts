export interface GetSeveritiesResultProps {
  bottomValue: number;
  color: string;
  index: number;
  topValue: number;
}

export interface FormatRadialResultProps {
  name: string;
  y: number;
}

export interface Axis {
  categories: [string];
  key: string;
  valueLabels: { label: string; value: number }[];
}

export type SelectOptionsProps = { label: string; value: string };

export type ValueResultProps = number | string;

export type ValueLabelsProps = { [key: string]: string } | SelectOptionsProps[];
