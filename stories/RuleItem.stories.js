import React from 'react';
import * as Yup from 'yup';
import { Card, Grid } from '@material-ui/core';
import { SQForm, SQFormButton } from '@selectquotelabs/sqform';
import RuleItem from '../src/components/RuleItem';

export default {
  title: 'JSON Rules Engine Visualiser',
};

const defaultSubmitHandler = (formValues) => {
  // eslint-disable-next-line no-alert
  window.alert(JSON.stringify(formValues, null, 2));
};

export const visualiser = () => {
  const initialValues = {
    testRule_factName: '',
    testRule_operator: '',
    testRule_valueName: '',
  };

  const validationSchema = {
    testRule_factName: Yup.string(),
    testRule_operator: Yup.string(),
    testRule_valueName: Yup.string(),
  };

  return (
    <Card raised style={{ padding: 16 }}>
      <SQForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={defaultSubmitHandler}
        muiGridProps={{ spacing: 4 }}
      >
        <RuleItem ruleName="testRule" />
        <Grid item sm={12}>
          <Grid container justify="flex-end">
            <SQFormButton>Submit</SQFormButton>
          </Grid>
        </Grid>
      </SQForm>
    </Card>
  );
};
