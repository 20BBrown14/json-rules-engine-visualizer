import { GROUP_TYPE, NUMERIC_OPERATORS, RULE_TYPE } from '../constants/constants';

const findValuesFromId = (id, type, formValues) => {
  if (type === GROUP_TYPE) {
    return {
      expression: formValues[`${id}_expression`],
    };
  }

  if (type === RULE_TYPE) {
    const operator = formValues[`${id}_operator`];

    return {
      fact: formValues[`${id}_factName`],
      operator,
      value: NUMERIC_OPERATORS.includes(operator) ? Number(formValues[`${id}_value`]) : formValues[`${id}_value`],
    };
  }

  return null;
};

const buildJSONRulesEngineCondition = (currentItem, formValues) => {
  if (currentItem.type === GROUP_TYPE) {
    const { expression } = findValuesFromId(currentItem.id, currentItem.type, formValues);
    return {
      [expression]: currentItem.children.map((child) => (
        buildJSONRulesEngineCondition(child, formValues)
      )),
    };
  }

  if (currentItem.type === RULE_TYPE) {
    return findValuesFromId(currentItem.id, currentItem.type, formValues);
  }

  return null;
};

export default buildJSONRulesEngineCondition;
