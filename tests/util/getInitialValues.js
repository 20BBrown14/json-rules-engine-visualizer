const getRuleItemInitialValues = (ruleName) => ({
  [`${ruleName}_factName`]: '',
  [`${ruleName}_operator`]: '',
  [`${ruleName}_valueName`]: '',
});

export default getRuleItemInitialValues;
