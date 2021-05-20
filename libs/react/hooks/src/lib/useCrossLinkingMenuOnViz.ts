import { Attribute } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { path } from 'ramda';
import useAttributeContextMenu from './useAttributeContextMenu';

export interface CrossLinkingProps {
  context?: { data: { crossLinking: any[] } };
  attributes?: any[];
}

interface CrossLinkingMenuOnViz {
  crossLinkingValuesForAxis: any[];
  openMenuIfCrossLink: (e: any) => void;
}

interface AxisProp {
  xAxis?: { key: string };
  yAxis?: { key: string };
}

// TODO type one axis or the other never both
const useCrossLinkingMenuOnViz = (
  props: CrossLinkingProps,
  { xAxis, yAxis }: AxisProp,
): CrossLinkingMenuOnViz => {
  const { openMenu } = useAttributeContextMenu();
  const axis = xAxis || yAxis;
  const crossLinking = props.context?.data?.crossLinking || [];
  const attr: Attribute | undefined = path<Attribute>(['attributes', 0], props);

  const openMenuIfCrossLink = (e) => {
    const hasContextMenu = !attr || !isNilOrEmpty(attr.crossLinking) || attr.isFilterable?.in;

    if (!hasContextMenu) return;

    const cellContentClicked = axis && path(['point', 'options', axis.key], e);

    if (!cellContentClicked) return;

    openMenu({
      e,
      attr,
      cell: cellContentClicked,
    });
  };
  const [xAxisValues = [], yAxisValues = []] = crossLinking;
  const crossLinkingValuesForAxis = xAxis ? xAxisValues : yAxisValues;

  return {
    crossLinkingValuesForAxis,
    openMenuIfCrossLink,
  };
};

export default useCrossLinkingMenuOnViz;
