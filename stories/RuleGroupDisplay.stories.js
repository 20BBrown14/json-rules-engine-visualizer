import React from 'react';
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';
import { SQFormButton, SQForm } from '@selectquotelabs/sqform';
import getInitialValuesFromSchema from '../src/util/getInitialValuesFromSchema';
import { DEFAULT_CONDITION_SCHEMA } from '../src/constants/constants';
import RuleGroupDisplay from '../src/components/RuleGroupDisplay';

export default {
  title: 'Rule Group Display',
};

const defaultSubmitHandler = (formValues) => {
  // eslint-disable-next-line no-alert
  window.alert(JSON.stringify(formValues, null, 2));
};

export const ruleGroupDisplay = () => (
  <Card raised style={{ padding: 16, marginTop: 150 }}>
    <SQForm
      onSubmit={defaultSubmitHandler}
      initialValues={getInitialValuesFromSchema(DEFAULT_CONDITION_SCHEMA)}
      muiGridProps={{ spacing: 2 }}
    >
      <RuleGroupDisplay conditionSchema={DEFAULT_CONDITION_SCHEMA} />
      <Grid item sm={12}>
        <Grid container justify="flex-end">
          <SQFormButton>Submit</SQFormButton>
        </Grid>
      </Grid>
    </SQForm>
  </Card>
);
