/* Operators from: https://github.com/CacheControl/json-rules-engine/blob/v6.0.0/docs/rules.md#operators */
/* As of json-rules-engine v6.0.0 */

const OPERATORS = [
  'equal',
  'notEqual',
  'lessThan',
  'lessThanInclusive',
  'greaterThan',
  'greaterThanInclusive',
  'in',
  'notIn',
  'contains',
  'doesNotContainer',
];

const OPERATOR_SQFORMDROPDOWN_OPTIONS = OPERATORS.map((operator) => (
  { label: operator, value: operator }
));

export default OPERATOR_SQFORMDROPDOWN_OPTIONS;
