import React from 'react';
import { Grid } from '@material-ui/core';
import { SQForm, SQFormButton } from '@selectquotelabs/sqform';
import getInitialValuesFromSchema from '../util/getInitialValuesFromSchema';
import getValidationSchemaFromSchema from '../util/getValidationSchemaFromSchema';
import conditionSchemaPropType from '../util/proptypes';
import buildJSONRulesEngineCondition from '../util/buildJSONRulesEngineCondition';
import RuleGroupDisplay from './RuleGroupDisplay';

function JSONRulesEngineVisualiser({
  conditionSchema,
}) {
  const [livingConditionSchema, setLivingConditionSchema] = React.useState(conditionSchema);

  const initialValues = React.useMemo(() => (
    getInitialValuesFromSchema(livingConditionSchema)
  ), [getInitialValuesFromSchema, livingConditionSchema]);

  const validationSchema = React.useMemo(() => (
    getValidationSchemaFromSchema(livingConditionSchema)
  ), [getValidationSchemaFromSchema, livingConditionSchema]);

  const handleSubmit = React.useCallback((formValues) => {
    const JSONRulesEngineCondition = buildJSONRulesEngineCondition(livingConditionSchema, formValues);

    // TODO: Get this to the consumer
    // eslint-disable-next-line no-console
    console.log('JSONRulesEngineCondition', JSONRulesEngineCondition);
  });

  return (
    <SQForm
      id="json-rules-engine-visualiser-SQForm"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
      key={`SQForm_${initialValues.length}`}
    >
      <RuleGroupDisplay
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
}

JSONRulesEngineVisualiser.propTypes = {
  conditionSchema: conditionSchemaPropType,
};

export default JSONRulesEngineVisualiser;
