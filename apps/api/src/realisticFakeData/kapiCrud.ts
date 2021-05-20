import { DbItem, KapiDb } from '@kleeen/kleeen-api';
import { findEntityByName, generateDisplayMediaByType, toEntityName, toPropertyName } from './utils';

import { Attribute } from '../types';
import { PrimitiveType } from './types';
import { Transformation } from '../utils';
import { calculateTransformation } from './transformation';

interface ListItem {
  id: string;
  displayValue: PrimitiveType;
}

const DISPLAY_VALUE = 'displayValue';
const METADATA = '$metadata';
const SELF_TRANSFORMATION = [Transformation.SelfSingle, Transformation.SelfMulti];

const toDisplayValue = (
  entityName: string,
  item: ListItem | any,
  attributes?: Attribute[],
): ListItem | unknown => {
  const { id, displayValue, ...rest } = item || {};
  delete rest['$loki'];
  delete rest.meta;
  const parsedDisplayValue = displayValue.displayValue ? displayValue : { displayValue };
  const displayValueAttr: Attribute = findEntityByName(entityName, attributes);
  const isXor = displayValueAttr?.isXor;
  const randomXor = isXor
    ? KapiDb.findRandomOne(toEntityName(parsedDisplayValue?.$metadata?.entityType))
    : null;
  const displayValueId = isXor ? randomXor?.id : id;
  const withDisplayValue = {
    id,
    [toPropertyName(entityName)]: {
      id: displayValueId,
      ...parsedDisplayValue,
      displayMedia: generateDisplayMediaByType(
        displayValueAttr?.formatType,
        parsedDisplayValue.displayValue,
        displayValueAttr,
      ),
    },
    [`${DISPLAY_VALUE}::${toPropertyName(entityName)}`]: {
      id: displayValueId,
      ...parsedDisplayValue,
    },
  };
  const withAggregations = Object.entries(rest).reduce((acc, [keyName, values]: [string, any]) => {
    const attribute: Attribute = findEntityByName(keyName, attributes);

    const displayMedia = attribute
      ? generateDisplayMediaByType(attribute?.formatType, values[DISPLAY_VALUE], attribute)
      : '';

    const useRandomEntity = () => {
      const randomEntity = KapiDb.findRandomOne(toEntityName(values?.$metadata?.entityType || keyName));

      acc[keyName] = {
        [DISPLAY_VALUE]: values[DISPLAY_VALUE],
        id: randomEntity?.id,
        displayMedia,
      };
      if (values[METADATA]) {
        acc[keyName][METADATA] = values[METADATA];
      }
    };

    if (!attribute) {
      useRandomEntity();
      return acc;
    }

    // TODO @carreta remove this when XORs can be aggregated [KSE3-1735]
    const isXorMultiple = attribute.isXor && attribute.hasMany;
    const isNotSelf = attribute.aggregation && !SELF_TRANSFORMATION.includes(attribute.aggregation);

    if (attribute.aggregation && isXorMultiple && isNotSelf) {
      acc[keyName] = {
        [DISPLAY_VALUE]: calculateTransformation(
          Array.isArray(values) ? values.map((value) => value.displayValue) : [values.displayValue],
          attribute.aggregation,
        ),
      };
      return acc;
    }
    if (attribute.hasMany || attribute.aggregation === Transformation.SelfMulti) {
      const randomEntity = KapiDb.findRandomOne(toEntityName(values?.$metadata?.entityType || keyName));
      acc[keyName] = Array.isArray(values)
        ? values.map((value) => ({ ...value, id: randomEntity.id }))
        : [values];
      return acc;
    }

    useRandomEntity();

    return acc;
  }, {});

  return { ...withDisplayValue, ...withAggregations };
};

export class KapiCrud {
  static add(entityName: string, entityObject: object) {
    return KapiDb.insert(toEntityName(entityName), entityObject as DbItem);
  }

  static delete(entityName: string, id: string) {
    const wasDeleted = KapiDb.remove(toEntityName(entityName), id);
    return wasDeleted;
  }

  static list(entityName: string, params?: { attributes: Attribute[] }) {
    const list = KapiDb.listByName<ListItem>(toEntityName(entityName));

    if (!list) throw `The ${entityName} does not exists`;

    const withDisplayValue = list.map((item) => toDisplayValue(entityName, item, params?.attributes));

    return withDisplayValue;
  }

  static rawList(entityName: string, params?: { attributes: Attribute[] }) {
    return KapiDb.listByName<ListItem>(toEntityName(entityName));
  }

  static get(entityName: string, id: string) {
    const item =
      KapiDb.findOne(toEntityName(entityName), id) || KapiDb.findRandomOne(toEntityName(entityName));
    const withDisplayValue = toDisplayValue(entityName, item);

    return withDisplayValue;
  }

  static update(entityName: string, entity: ListItem) {
    if (!entity.id && Array.isArray(entity[entityName])) {
      const newEntries = entity[entityName]
        .filter((item) => !item.id)
        .map((item) => KapiCrud.add(entityName, item));
      return newEntries;
    }

    const item = KapiDb.update(toEntityName(entityName), entity.id, entity);
    const withDisplayValue = toDisplayValue(entityName, item);

    return withDisplayValue;
  }

  static getFilters(attributes: string[]) {
    const attributesList = attributes || [];
    const filters = attributesList.reduce((acc, attribute) => {
      const result = KapiDb.getUniqueEntityAttributes(attribute);
      if (result && result.length) {
        acc[attribute] = result;
      }

      return acc;
    }, {});

    return {
      results: Object.entries(filters),
    };
  }
}
