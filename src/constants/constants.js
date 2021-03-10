import { v4 as uuidv4 } from 'uuid';

const BOOLEAN_EXPRESSIONS = [
  'all',
  'any',
];

export const EXPRESSION_SQFORMDROPDOWN_OPTIONS = BOOLEAN_EXPRESSIONS.map((boolExpression) => (
  { label: boolExpression.toUpperCase(), value: boolExpression }
));

export const TYPE_KEY = 'type';
export const GROUP_TYPE = 'group';
export const RULE_TYPE = 'rule';

export const DEFAULT_CONDITION_SCHEMA = {
  type: 'group',
  id: uuidv4(),
  condition: 'any',
  children: [
    {
      type: 'rule',
      id: uuidv4(),
      factName: 'firstFact',
      operator: 'equal',
      value: 'firstValue',
    },
    {
      type: 'group',
      id: uuidv4(),
      condition: 'all',
      children: [
        {
          type: 'rule',
          id: uuidv4(),
          factName: '',
          operator: '',
          value: '',
        },
      ],
    },
  ],
};
