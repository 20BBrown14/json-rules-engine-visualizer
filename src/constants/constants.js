const BOOLEAN_EXPRESSIONS = [
  'all',
  'any',
];

const EXPRESSION_SQFORMDROPDOWN_OPTIONS = BOOLEAN_EXPRESSIONS.map((boolExpression) => (
  { label: boolExpression.toUpperCase(), value: boolExpression }
));

export default EXPRESSION_SQFORMDROPDOWN_OPTIONS;
