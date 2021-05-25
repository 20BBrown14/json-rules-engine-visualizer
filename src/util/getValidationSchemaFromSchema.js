import * as Yup from 'yup';
import {
  TYPE_KEY, GROUP_TYPE, RULE_TYPE, FACT_NAME_KEY,
} from '../constants/constants';

export const getFactNames = (schema) => {
  if (!schema) {
    return [];
  }

  return Object.entries(schema).reduce((acc, [key, value]) => {
    if (key === TYPE_KEY && value === GROUP_TYPE) {
      if (!schema?.children?.length) {
        return acc;
      }

      const childrenFactNames = [];
      schema.children.forEach((child) => {
        childrenFactNames.push(...getFactNames(child));
      });
      return [
        ...acc,
        ...childrenFactNames,
      ];
    }

    if (key === FACT_NAME_KEY) {
      return [
        ...acc,
        value,
      ];
    }
    return acc;
  }, []);
};

const getIsDuplicateFactName = (value, factNames) => {
  if (!factNames) {
    return false;
  }

  const modifiedFactNames = [...factNames];
  const currentFactNameIndex = modifiedFactNames.indexOf(value);
  if (currentFactNameIndex > -1) {
    modifiedFactNames.splice(currentFactNameIndex, 1);
  }
  return modifiedFactNames.includes(value);
};

const buildValidationSchemaFromSchema = (schema, factNames) => {
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
              ...buildValidationSchemaFromSchema(child, factNames),
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
          [`${schema.id}_factName`]: Yup.string()
            .test(
              'isDuplicate',
              'Duplicate fact name',
              (formValue) => !getIsDuplicateFactName(formValue, factNames),
            )
            .required('Required'),
          [`${schema.id}_operator`]: Yup.string().required('Required'),
          [`${schema.id}_value`]: Yup.string(),
        };
      }
    }

    return acc;
  }, {});
};

export const getValidationSchemaFromSchema = (schema, factNames) => {
  const factNamesArray = Object.values(factNames);
  return buildValidationSchemaFromSchema(schema, factNamesArray);
};
