import React from 'react';
import { Grid } from '@material-ui/core';
import { SQForm, SQFormButton } from '@selectquotelabs/sqform';
import getInitialValuesFromSchema from '../util/getInitialValuesFromSchema';
import conditionSchemaPropType from '../util/proptypes';
import RuleGroupDisplay from './RuleGroupDisplay';

function JSONRulesEngineVisualiser({
  conditionSchema,
}) {
  return (
    <SQForm initialValues={getInitialValuesFromSchema(conditionSchema)} onSubmit={() => {}}>
      <RuleGroupDisplay conditionSchema={conditionSchema} />
      <Grid item sm={12}>
        <Grid container justify="flex-end">
          <SQFormButton>Submit</SQFormButton>
        </Grid>
      </Grid>
    </SQForm>
  );
}

JSONRulesEngineVisualiser.propTypes = {
  conditionSchema: conditionSchemaPropType,
};

export default JSONRulesEngineVisualiser;
