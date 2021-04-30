import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import getRuleElementsFromSchema from '../util/getRuleElementsFromSchema';
import { visualiserSchemaPropType } from '../util/proptypes';
import buildNewSchemaWithAddition from '../util/buildNewSchemaWithAddition';
import buildNewSchemaWithRemoval from '../util/buildNewSchemaWithRemoval';

function RuleGroupDisplay({
  livingConditionSchema,
  setLivingConditionSchema,
  factNameDropdownOptions,
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
        true,
      )
    ), [
      getRuleElementsFromSchema,
      livingConditionSchema,
      addChildToGroup,
      removeChildFromGroup,
      factNameDropdownOptions,
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
    value: PropTypes.oneOf([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  })),
};

export default RuleGroupDisplay;
