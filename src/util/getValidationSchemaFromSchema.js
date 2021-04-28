import * as Yup from 'yup';
import { TYPE_KEY, GROUP_TYPE, RULE_TYPE } from '../constants/constants';

const getValidationSchemaFromSchema = (schema) => {
  if (!schema) {
    return {};
  }

  return Object.entries(schema).reduce((acc, [key, value]) => {
    if (key === TYPE_KEY) {
      if (value === GROUP_TYPE) {
        let childValidationSchema = {};

        if (schema?.children?.length) {
          schema.children.forEach((child) => {
            childValidationSchema = {
              ...childValidationSchema,
              ...getValidationSchemaFromSchema(child),
            };
          });
        }

        return {
          ...acc,
          ...childValidationSchema,
          [`${schema.id}_expression`]: Yup.string().required('Required'),
        };
      }

      if (value === RULE_TYPE) {
        return {
          ...acc,
          [`${schema.id}_factName`]: Yup.string().required('Required'),
          [`${schema.id}_operator`]: Yup.string().required('Required'),
          [`${schema.id}_value`]: Yup.string(),
        };
      }
    }

    return acc;
  }, {});
};

export default getValidationSchemaFromSchema;
