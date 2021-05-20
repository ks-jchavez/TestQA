import { DataListingArgs, GetListingDataResults } from '../types';
import { getPropertyFormat, toPropertyName } from './utils';

import { GenericEntityItem } from './types';
import { KapiCrud } from './kapiCrud';
import camelcase from 'lodash.camelcase';
import { filterList } from './filtering';

const addAttributes = (attributes, entityItem) =>
  attributes.reduce((acc, attr) => {
    acc[attr.name] = entityItem[attr.name];
    return acc;
  }, {});

const addAttributesFormat = (entityName, attributes) =>
  attributes.reduce((acc, attr) => {
    const attributeName = entityName === attr.name ? 'displayValue' : attr.name;
    acc[attr.name] = getPropertyFormat(entityName, attributeName);
    return acc;
  }, {});

export const getListingData = (
  input: DataListingArgs,
  withAggregations = true,
): GetListingDataResults | any => {
  const params = {
    attributes: input.attributes,
  };

  if (input.entity === '[KS] GlobalApp') {
    const propName = toPropertyName(camelcase(input.attributes[0].rawEntityName));
    const rawData = KapiCrud.rawList(
      camelcase(input.attributes[0].rawEntityName),
      params,
    ) as GenericEntityItem[];

    const format = addAttributesFormat(propName, input.attributes);

    return { format, data: [{ [propName]: rawData }] };
  }

  const rawData = KapiCrud.list(camelcase(input.entity), params) as GenericEntityItem[];
  const filteredData = filterList(rawData, camelcase(input.entity), input.filters);
  const entityName = toPropertyName(camelcase(input.entity));
  const displayValueCol = `displayValue::${entityName}`;

  const format = addAttributesFormat(entityName, input.attributes);

  const data = filteredData.map((entityItem) => {
    const withAttributes = addAttributes(input.attributes, entityItem);
    const parsedEntityItem = {
      id: entityItem.id,
      [displayValueCol]: entityItem[displayValueCol],
      ...withAttributes,
    };

    return parsedEntityItem;
  }) as GenericEntityItem[];

  return { format, data };
};
