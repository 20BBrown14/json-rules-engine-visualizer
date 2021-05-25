import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { SQForm, SQFormButton } from '@selectquotelabs/sqform';
import getInitialValuesFromSchema from '../util/getInitialValuesFromSchema';
import { getValidationSchemaFromSchema } from '../util/getValidationSchemaFromSchema';
import {
  rulesEngineSchemaPropType,
  operatorDropdownOptionsPropType,
  valueDropdownOptionsPropType,
} from '../util/proptypes';
import buildJSONRulesEngineCondition from '../util/buildJSONRulesEngineCondition';
import engineSchemaToVisualisationSchema from '../util/engineSchemaToVisualisationSchema';
import { DEFAULT_CONDITION_SCHEMA } from '../constants/constants';
import RuleGroupDisplay from './RuleGroupDisplay';

function JSONRulesEngineVisualiser({
  conditionSchema,
  onSubmit,
  factNameDropdownOptions,
  operatorDropdownOptions,
  valueDropdownOptions,
}) {
  const [livingConditionSchema, setLivingConditionSchema] = React.useState(() => (
    engineSchemaToVisualisationSchema(conditionSchema) || DEFAULT_CONDITION_SCHEMA
  ));

  const [allFactNames, setAllFactNames] = React.useState({});

  const initialValues = React.useMemo(() => (
    getInitialValuesFromSchema(livingConditionSchema)
  ), [getInitialValuesFromSchema, livingConditionSchema]);

  const validationSchema = React.useMemo(() => (
    getValidationSchemaFromSchema(livingConditionSchema, allFactNames)
  ), [getValidationSchemaFromSchema, livingConditionSchema, allFactNames]);

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

    onSubmit(JSONRulesEngineCondition);
  });

  const updateAllFactNames = React.useCallback((factNameKey, factNameValue) => {
    setAllFactNames((previousFactNames) => ({
      ...previousFactNames,
      [factNameKey]: factNameValue,
    }));
  }, []);

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
        factNameDropdownOptions={factNameDropdownOptions}
        operatorDropdownOptions={operatorDropdownOptions}
        valueDropdownOptions={valueDropdownOptions}
        updateAllFactNames={updateAllFactNames}
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
  /** Condition schema, json-rules-engine format */
  conditionSchema: rulesEngineSchemaPropType,
  /** Function to be called when schema is submitted. Should take a JSON object. */
  onSubmit: PropTypes.func.isRequired,
  /** Options to be used for the fact dropdown. */
  factNameDropdownOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  })),
  /** Options to be used for the operator dropdown */
  operatorDropdownOptions: operatorDropdownOptionsPropType,
  /** Options to be used for the value dropdown */
  valueDropdownOptions: valueDropdownOptionsPropType,
};

export default JSONRulesEngineVisualiser;
