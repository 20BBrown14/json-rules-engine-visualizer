import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import getRuleElementsFromSchema from '../util/getRuleElementsFromSchema';
import { visualiserSchemaPropType, valueDropdownOptionsPropType } from '../util/proptypes';
import buildNewSchemaWithAddition from '../util/buildNewSchemaWithAddition';
import buildNewSchemaWithRemoval from '../util/buildNewSchemaWithRemoval';

function RuleGroupDisplay({
  livingConditionSchema,
  setLivingConditionSchema,
  factNameDropdownOptions,
  valueDropdownOptions,
  updateAllFactNames,
}) {
  const addChildToGroup = React.useCallback((ruleGroupName, childTypeToAdd) => {
    setLivingConditionSchema(buildNewSchemaWithAddition(livingConditionSchema, ruleGroupName, childTypeToAdd));
  }, [livingConditionSchema, setLivingConditionSchema]);

  const removeChildFromGroup = React.useCallback((idToRemove) => {
    setLivingConditionSchema(buildNewSchemaWithRemoval(livingConditionSchema, idToRemove));
  }, [livingConditionSchema, setLivingConditionSchema]);

  const ruleElements = React.useMemo(
    () => (
      getRuleElementsFromSchema(
        livingConditionSchema,
        addChildToGroup,
        removeChildFromGroup,
        factNameDropdownOptions,
        valueDropdownOptions,
        updateAllFactNames,
        true,
      )
    ), [
      getRuleElementsFromSchema,
      livingConditionSchema,
      addChildToGroup,
      removeChildFromGroup,
      factNameDropdownOptions,
      valueDropdownOptions,
      updateAllFactNames,
    ],
  );

  return (
    <Grid item sm={12} style={{ margin: 10, marginBottom: -25 }}>
      {ruleElements}
    </Grid>
  );
}

RuleGroupDisplay.propTypes = {
  livingConditionSchema: visualiserSchemaPropType,
  setLivingConditionSchema: PropTypes.func.isRequired,
  /** Options to be used for the fact dropdown. */
  factNameDropdownOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  })),
  /** Options to be used for the value dropdown */
  valueDropdownOptions: valueDropdownOptionsPropType,
  /** Function to update all fact names */
  updateAllFactNames: PropTypes.func.isRequired,
};

export default RuleGroupDisplay;
