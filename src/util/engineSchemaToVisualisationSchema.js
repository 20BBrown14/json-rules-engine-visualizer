import { v4 as uuidv4 } from 'uuid';
import { GROUP_TYPE, RULE_TYPE } from '../constants/constants';

const engineSchemaToVisualisationSchema = (engineSchema) => {
  if (!engineSchema || typeof engineSchema !== 'object') {
    return undefined;
  }

  const {
    any, all, fact, operator, value,
  } = engineSchema;

  if (any || all) {
    // Group
    if ((any && !Array.isArray(any)) || (all && !Array.isArray(all))) {
      return undefined;
    }

    return {
      type: GROUP_TYPE,
      id: uuidv4(),
      condition: any ? 'any' : 'all',
      children: (any || all).map((child) => engineSchemaToVisualisationSchema(child)),
    };
  }

  if (fact !== undefined && operator !== undefined && value !== undefined) {
    // Item
    return {
      type: RULE_TYPE,
      id: uuidv4(),
      factName: engineSchema.fact,
      operator: engineSchema.operator,
      value: engineSchema.value,
    };
  }

  return undefined;
};

export default engineSchemaToVisualisationSchema;
