import React from 'react';
import RuleGroup from '../components/RuleGroup';
import RuleItem from '../components/RuleItem';
import { TYPE_KEY, GROUP_TYPE, RULE_TYPE } from '../constants/constants';

const getRuleElementsFromSchema = (schema) => {
  if (!schema) {
    return [];
  }

  return Object.entries(schema).reduce((acc, [key, value]) => {
    if (key === TYPE_KEY) {
      if (value === GROUP_TYPE) {
        if (schema?.children?.length) {
          let childElements = [];
          schema.children.forEach((child) => {
            childElements = [
              ...childElements,
              ...getRuleElementsFromSchema(child),
            ];
          });

          return [
            ...acc,
            <RuleGroup ruleGroupName={schema.id} key={`${schema.id}_ruleGroup`}>
              {childElements}
            </RuleGroup>,
          ];
        }
      }

      if (value === RULE_TYPE) {
        return [
          ...acc,
          <RuleItem ruleName={schema.id} key={`${schema.id}_ruleItem`} />,
        ];
      }
    }

    return acc;
  }, []);
};

export default getRuleElementsFromSchema;
