import React from 'react';
import { Grid } from '@material-ui/core';
import getRuleElementsFromSchema from '../util/getRuleElementsFromSchema';
import conditionSchemaPropType from '../util/proptypes';

function RuleGroupDisplay({
  conditionSchema,
}) {
  return (
    <Grid item sm={12} style={{ margin: 10 }}>
      {getRuleElementsFromSchema(conditionSchema)}
    </Grid>
  );
}

RuleGroupDisplay.propTypes = {
  conditionSchema: conditionSchemaPropType,
};

export default RuleGroupDisplay;
