import React from 'react';
import RuleGroup from '../components/RuleGroup';
import RuleItem from '../components/RuleItem';
import { TYPE_KEY, GROUP_TYPE, RULE_TYPE } from '../constants/constants';

const getRuleElementsFromSchema = (
  schema,
  addChildToGroup,
  removeChildFromGroup,
  factNameDropdownOptions,
  valueDropdownOptions,
  isFirstIteration,
) => {
  if (!schema) {
    return [];
  }

  return Object.entries(schema).reduce((acc, [key, value]) => {
    if (key === TYPE_KEY) {
      if (value === GROUP_TYPE) {
        let childElements = [];
        if (schema?.children?.length) {
          schema.children.forEach((child) => {
            childElements = [
              ...childElements,
              ...getRuleElementsFromSchema(
                child,
                addChildToGroup,
                removeChildFromGroup,
                factNameDropdownOptions,
                valueDropdownOptions,
                false,
              ),
            ];
          });
        }

        return [
          ...acc,
          <RuleGroup
            key={`${schema.id}_ruleGroup`}
            ruleGroupName={schema.id}
            addChildToGroup={addChildToGroup}
            removeRuleGroup={removeChildFromGroup}
            isTopGroup={isFirstIteration}
          >
            {childElements}
          </RuleGroup>,
        ];
      }

      if (value === RULE_TYPE) {
        return [
          ...acc,
          <RuleItem
            key={`${schema.id}_ruleItem`}
            ruleName={schema.id}
            removeRuleItem={removeChildFromGroup}
            factNameDropdownOptions={factNameDropdownOptions}
            valueDropdownOptions={valueDropdownOptions}
          />,
        ];
      }
    }

    return acc;
  }, []);
};

export default getRuleElementsFromSchema;
