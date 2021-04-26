import { TYPE_KEY, GROUP_TYPE, RULE_TYPE } from '../constants/constants';

const getInitialValuesFromSchema = (schema) => {
  if (!schema) {
    return {};
  }

  return Object.entries(schema).reduce((acc, [key, value]) => {
    if (key === TYPE_KEY) {
      if (value === GROUP_TYPE) {
        let childInitialValues = {};

        if (schema?.children?.length) {
          schema.children.forEach((child) => {
            childInitialValues = {
              ...childInitialValues,
              ...getInitialValuesFromSchema(child),
            };
          });
        }

        return {
          ...acc,
          ...childInitialValues,
          [`${schema.id}_expression`]: schema.condition ?? 'all',
        };
      }

      if (value === RULE_TYPE) {
        return {
          ...acc,
          [`${schema.id}_factName`]: schema.factName ?? '',
          [`${schema.id}_operator`]: schema.operator ?? '',
          [`${schema.id}_value`]: schema.value ?? '',
        };
      }
    }

    return acc;
  }, {});
};

export default getInitialValuesFromSchema;
