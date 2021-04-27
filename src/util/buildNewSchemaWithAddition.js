import { v4 as uuidv4 } from 'uuid';
import { GROUP_TYPE, RULE_TYPE } from '../constants/constants';

const getNewChildToAdd = (childTypeToAdd) => {
  if (childTypeToAdd === GROUP_TYPE) {
    return {
      type: GROUP_TYPE,
      id: uuidv4(),
      condition: 'all',
      children: [],
    };
  }

  if (childTypeToAdd === RULE_TYPE) {
    return {
      type: RULE_TYPE,
      id: uuidv4(),
      factName: '',
      operator: 'equal',
      value: '',
    };
  }

  return null;
};

const buildNewSchemaWithAddition = (existingSchema, ruleGroupName, childTypeToAdd) => {
  let newConditionSchema = {};
  if (existingSchema.id === ruleGroupName) {
    newConditionSchema = {
      ...newConditionSchema,
      ...existingSchema,
      children: [
        ...existingSchema.children,
        getNewChildToAdd(childTypeToAdd),
      ],
    };
    return newConditionSchema;
  }

  Object.entries(existingSchema).forEach(([key, value]) => {
    if (key === 'children' && value?.length) {
      newConditionSchema = {
        ...newConditionSchema,
        children: value.map((ruleInformationObject) => (
          buildNewSchemaWithAddition(ruleInformationObject, ruleGroupName, childTypeToAdd)
        )),
      };

      return;
    }

    newConditionSchema = {
      ...newConditionSchema,
      [key]: value,
    };
  });

  return newConditionSchema;
};

export default buildNewSchemaWithAddition;
