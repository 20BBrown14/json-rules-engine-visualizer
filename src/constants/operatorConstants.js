/* Operators from: https://github.com/CacheControl/json-rules-engine/blob/v6.0.0/docs/rules.md#operators */
/* As of json-rules-engine v6.0.0 */

export const EQUAL_OPERATOR = 'equal';
export const NOT_EQUAL_OPERATOR = 'notEqual';
export const LESS_THAN_OPERATOR = 'lessThan';
export const LESS_THAN_INCLUSIVE_OPERATOR = 'lessThanInclusive';
export const GREATER_THAN_OPERATOR = 'greaterThan';
export const GREATER_THAN_INCLUSIVE_OPERATOR = 'greaterThanInclusive';
export const IN_OPERATOR = 'in';
export const NOT_IN_OPERATOR = 'notIn';
export const CONTAINS_OPERATOR = 'contains';
export const DOES_NOT_CONTAIN_OPERATOR = 'doesNotContain';

const OPERATORS = [
  EQUAL_OPERATOR,
  NOT_EQUAL_OPERATOR,
  LESS_THAN_OPERATOR,
  LESS_THAN_INCLUSIVE_OPERATOR,
  GREATER_THAN_OPERATOR,
  GREATER_THAN_INCLUSIVE_OPERATOR,
  IN_OPERATOR,
  NOT_IN_OPERATOR,
  CONTAINS_OPERATOR,
  DOES_NOT_CONTAIN_OPERATOR,
];

export const STRING_OPERATORS = [
  'equal',
  'notEqual',
];

export const NUMERIC_OPERATORS = [
  'lessThan',
  'lessThanInclusive',
  'greaterThan',
  'greaterThanInclusive',
];

export const ARRAY_OPERATORS = [
  'in',
  'notIn',
  'contains',
  'doesNotContain',
];

export default OPERATORS;
