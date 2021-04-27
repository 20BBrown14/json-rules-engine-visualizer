import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import getRuleElementsFromSchema from '../util/getRuleElementsFromSchema';
import conditionSchemaPropType from '../util/proptypes';
import buildNewSchemaWithAddition from '../util/buildNewSchemaWithAddition';
import buildNewSchemaWithRemoval from '../util/buildNewSchemaWithRemoval';

function RuleGroupDisplay({
  livingConditionSchema,
  setLivingConditionSchema,
}) {
  const addChildToGroup = React.useCallback((ruleGroupName, childTypeToAdd) => {
    setLivingConditionSchema(buildNewSchemaWithAddition(livingConditionSchema, ruleGroupName, childTypeToAdd));
  }, [livingConditionSchema, setLivingConditionSchema]);

  const removeChildFromGroup = React.useCallback((idToRemove) => {
    setLivingConditionSchema(buildNewSchemaWithRemoval(livingConditionSchema, idToRemove));
  }, [livingConditionSchema, setLivingConditionSchema]);

  const ruleElements = React.useMemo(
    () => (
      getRuleElementsFromSchema(livingConditionSchema, addChildToGroup, removeChildFromGroup, true)
    ), [getRuleElementsFromSchema, livingConditionSchema, addChildToGroup, removeChildFromGroup],
  );

  return (
    <Grid item sm={12} style={{ margin: 10, marginBottom: -25 }}>
      {ruleElements}
    </Grid>
  );
}

RuleGroupDisplay.propTypes = {
  livingConditionSchema: conditionSchemaPropType,
  setLivingConditionSchema: PropTypes.func.isRequired,
};

export default RuleGroupDisplay;
