import React from 'react';
import { renderToString } from 'react-dom/server';
import RuleGroup from '../../src/components/RuleGroup';
import RuleItem from '../../src/components/RuleItem';
import SQFormWrapper from './SQFormWrapper';

export const testConditionSchema = {
  type: 'group',
  id: 'a',
  condition: 'any',
  children: [
    {
      type: 'rule',
      id: 'b',
      factName: 'firstFact',
      operator: 'equal',
      value: 'firstValue',
    },
    {
      type: 'group',
      id: 'c',
      condition: undefined,
      children: [
        {
          type: 'rule',
          id: 'd',
          factName: undefined,
          operator: undefined,
          value: undefined,
        },
        {
          type: 'rule',
          id: 'e',
          factName: '',
          operator: '',
          value: '',
        },
      ],
    },
  ],
};

export const expectedInitialValues = {
  a_expression: 'any',
  b_factName: 'firstFact',
  b_operator: 'equal',
  b_value: 'firstValue',
  c_expression: 'all',
  d_factName: '',
  d_operator: '',
  d_value: '',
  e_factName: '',
  e_operator: '',
  e_value: '',
};

export const expectedElements = renderToString(
  <SQFormWrapper initialValues={expectedInitialValues}>
    <RuleGroup ruleGroupName="a" key="a_ruleGroup">
      <RuleItem ruleName="b" key="b_ruleItem" />
      <RuleGroup ruleGroupName="c" key="c_ruleGroup">
        <RuleItem ruleName="d" key="d_ruleItem" />
        <RuleItem ruleName="e" key="e_ruleItem" />
      </RuleGroup>
    </RuleGroup>
  </SQFormWrapper>,
);
