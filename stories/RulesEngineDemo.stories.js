import React from 'react';
import * as Yup from 'yup';
import { Engine, Rule } from 'json-rules-engine';
import { Card, Grid, Typography } from '@material-ui/core';
import {
  SQForm, SQFormButton, SQFormDropdown, SQFormTextField,
} from '@selectquotelabs/sqform';
import JSONRulesEngineVisualiser from '../src';

export default {
  title: 'Rules Engine Demo',
};

const CAR_MAKES = [
  { label: 'Ford', value: 'ford' },
  { label: 'Chevy', value: 'chevy' },
  { label: 'Volkswagen', value: 'volkswagen' },
  { label: 'Nissan', value: 'nissan' },
  { label: 'Mazda', value: 'mazda' },
  { label: 'Dodge', value: 'dodge' },
  { label: 'Buick', value: 'buick' },
];

const CAR_COLORS = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Orange', value: 'orange' },
];

const STATES = [
  { label: 'Kansas', value: 'kansas' },
  { label: 'Missouri', value: 'missouri' },
  { label: 'Arizona', value: 'arizona' },
  { label: 'New York', value: 'new york' },
];

const TEST_CONDITION_SCHEMA = {
  all: [{
    fact: 'year',
    operator: 'greaterThan',
    value: '2016',
  },
  {
    fact: 'make',
    operator: 'equal',
    value: 'ford',
  },
  {
    fact: 'color',
    operator: 'equal',
    value: 'red',
  },
  {
    fact: 'state',
    operator: 'equal',
    value: 'kansas',
  },
  ],
};

const engine = new Engine();

export const rulesEngineDemo = () => {
  const [rulesSchema, setRulesSchema] = React.useState(null);

  const initialValues = {
    year: '2017',
    make: 'ford',
    color: 'red',
    state: 'kansas',
    mileage: '',
  };

  const validationSchema = {
    year: Yup.number().typeError('Must be number').required('Required'),
    make: Yup.string().required('Required'),
    color: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    mileage: Yup.number().typeError('Must be number').required('Required'),
  };

  const handleFormSubmit = (formValues) => {
    engine.run(formValues).then(
      (results) => {
        // eslint-disable-next-line no-console
        console.log('isWarrantyValid results', results);

        const isWarrantyValidEvent = results?.results?.find((event) => event?.event?.type === 'warranty-query');

        // eslint-disable-next-line no-console
        console.log('isWarrantyValidEvent', isWarrantyValidEvent);
        const isWarrantyValid = isWarrantyValidEvent?.event?.params?.isWarrantyValid || false;

        // eslint-disable-next-line no-alert
        window.alert(`Your vehicle is${isWarrantyValid ? '' : ' not'} valid for warranty!`);
      },
    );
  };

  const handleRuleSubmit = (newRulesSchema) => {
    if (rulesSchema) {
      engine.removeRule(rulesSchema);
    }

    const newRule = new Rule({
      conditions: { ...newRulesSchema },
      event: {
        type: 'warranty-query',
        params: {
          isWarrantyValid: true,
        },
      },
    });
    engine.addRule(newRule);
    setRulesSchema(newRule);

    // eslint-disable-next-line no-console
    console.log(engine);
  };

  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <Card raised style={{ padding: 16, marginTop: 300 }}>
          <JSONRulesEngineVisualiser conditionSchema={TEST_CONDITION_SCHEMA} onSubmit={handleRuleSubmit} />
        </Card>
      </Grid>
      <Grid item sm={12}>
        <Card raised style={{ padding: 16 }}>
          <Typography color={rulesSchema ? 'primary' : 'error'}>
            {`The rules engine${rulesSchema ? ' does' : ' DOES NOT'} have a rule`}
          </Typography>
          <SQForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            <SQFormTextField
              name="year"
              label="Year"
            />
            <SQFormDropdown
              name="make"
              label="Make"
            >
              {CAR_MAKES}
            </SQFormDropdown>
            <SQFormDropdown
              name="color"
              label="Color"
            >
              {CAR_COLORS}
            </SQFormDropdown>
            <SQFormDropdown
              name="state"
              label="State"
            >
              {STATES}
            </SQFormDropdown>
            <SQFormTextField
              name="mileage"
              label="Mileage"
            />
            <SQFormButton>
              Submit
            </SQFormButton>
          </SQForm>
        </Card>
      </Grid>
    </Grid>
  );
};
