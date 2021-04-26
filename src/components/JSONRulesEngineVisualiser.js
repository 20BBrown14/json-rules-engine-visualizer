import React from 'react';
import { Grid } from '@material-ui/core';
import { SQForm, SQFormButton } from '@selectquotelabs/sqform';
import getInitialValuesFromSchema from '../util/getInitialValuesFromSchema';
import conditionSchemaPropType from '../util/proptypes';
import RuleGroupDisplay from './RuleGroupDisplay';

function JSONRulesEngineVisualiser({
  conditionSchema,
}) {
  const [livingConditionSchema, setLivingConditionSchema] = React.useState(conditionSchema);

  const initialValues = React.useMemo(() => (
    getInitialValuesFromSchema(livingConditionSchema)
  ), [getInitialValuesFromSchema, livingConditionSchema]);

  const elements = (
    <SQForm
      id="json-rules-engine-visualiser-SQForm"
      initialValues={initialValues}
      onSubmit={() => {}}
      enableReinitialize
      key={`SQForm_${initialValues.length}`}
    >
      <RuleGroupDisplay
        initialValues={initialValues}
        livingConditionSchema={livingConditionSchema}
        setLivingConditionSchema={setLivingConditionSchema}
      />
      <Grid item sm={12}>
        <Grid container justify="flex-end">
          <SQFormButton>Submit</SQFormButton>
        </Grid>
      </Grid>
    </SQForm>
  );

  return elements;
}

JSONRulesEngineVisualiser.propTypes = {
  conditionSchema: conditionSchemaPropType,
};

export default JSONRulesEngineVisualiser;
