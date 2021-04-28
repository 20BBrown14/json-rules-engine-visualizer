import React from 'react';
import { Grid } from '@material-ui/core';
import { SQForm, SQFormButton } from '@selectquotelabs/sqform';
import getInitialValuesFromSchema from '../util/getInitialValuesFromSchema';
import getValidationSchemaFromSchema from '../util/getValidationSchemaFromSchema';
import conditionSchemaPropType from '../util/proptypes';
import buildJSONRulesEngineCondition from '../util/buildJSONRulesEngineCondition';
import engineSchemaToVisualisationSchema from '../util/engineSchemaToVisualisationSchema';
import { DEFAULT_CONDITION_SCHEMA } from '../constants/constants';
import RuleGroupDisplay from './RuleGroupDisplay';

function JSONRulesEngineVisualiser({
  conditionSchema,
}) {
  const [livingConditionSchema, setLivingConditionSchema] = React.useState(() => (
    engineSchemaToVisualisationSchema(conditionSchema) || DEFAULT_CONDITION_SCHEMA
  ));

  const initialValues = React.useMemo(() => (
    getInitialValuesFromSchema(livingConditionSchema)
  ), [getInitialValuesFromSchema, livingConditionSchema]);

  const validationSchema = React.useMemo(() => (
    getValidationSchemaFromSchema(livingConditionSchema)
  ), [getValidationSchemaFromSchema, livingConditionSchema]);

  const isSubmitDisabled = React.useMemo(() => {
    // All groups must have at least one child
    const findEmptyChildren = (children) => (
      !!Object.entries(children).find(([key, value]) => {
        if (key === 'children') {
          if (!value || !value.length) {
            return true;
          }

          return value.find((child) => (findEmptyChildren(child)));
        }

        return false;
      })
    );

    return findEmptyChildren(livingConditionSchema);
  }, [livingConditionSchema]);

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
          <SQFormButton isDisabled={isSubmitDisabled}>Submit</SQFormButton>
        </Grid>
      </Grid>
    </SQForm>
  );
}

JSONRulesEngineVisualiser.propTypes = {
  conditionSchema: conditionSchemaPropType,
};

export default JSONRulesEngineVisualiser;
