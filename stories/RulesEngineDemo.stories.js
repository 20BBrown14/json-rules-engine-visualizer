import React from 'react';
import * as Yup from 'yup';
import { Engine, Rule } from 'json-rules-engine';
import { Card, Grid, Typography } from '@material-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, boolean } from '@storybook/addon-knobs';
import {
  SQForm, SQFormButton, SQFormDropdown, SQFormTextField,
} from '@selectquotelabs/sqform';
import { JSONRulesEngineVisualiser } from '../src';
import {
  EQUAL_OPERATOR,
  GREATER_THAN_INCLUSIVE_OPERATOR,
  GREATER_THAN_OPERATOR,
  LESS_THAN_INCLUSIVE_OPERATOR,
  LESS_THAN_OPERATOR,
  NOT_EQUAL_OPERATOR,
  NUMERIC_OPERATORS,
  STRING_OPERATORS,
} from '../src/constants/operatorConstants';
import stringArrayToDropdownOptions from '../src/util/stringArrayToDropdownOptions';

export default {
  title: 'Rules Engine Demo',
  decorators: [withKnobs],
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

const factNameDropdownOptions = [
  { label: 'Year', value: 'year' },
  { label: 'Make', value: 'make' },
  { label: 'Color', value: 'color' },
  { label: 'State', value: 'state' },
  { label: 'Mileage', value: 'mileage' },
];

const generalOperatorDropdownOptions = stringArrayToDropdownOptions([
  EQUAL_OPERATOR,
  NOT_EQUAL_OPERATOR,
  LESS_THAN_OPERATOR,
  LESS_THAN_INCLUSIVE_OPERATOR,
  GREATER_THAN_OPERATOR,
  GREATER_THAN_INCLUSIVE_OPERATOR,
]);

const specificOperatorDropdownOptions = {
  year: stringArrayToDropdownOptions(NUMERIC_OPERATORS),
  make: stringArrayToDropdownOptions(STRING_OPERATORS),
  color: stringArrayToDropdownOptions(STRING_OPERATORS),
  state: stringArrayToDropdownOptions(STRING_OPERATORS),
  mileage: stringArrayToDropdownOptions(NUMERIC_OPERATORS),
};

const generalValueDropdownOptions = [
  ...CAR_COLORS,
  ...CAR_MAKES,
  ...STATES,
  { label: '2010', value: '2010' },
  { label: '2016', value: '2016' },
  { label: '2018', value: '2018' },
  { label: '2020', value: '2020' },
  { label: '1', value: '1' },
  { label: '100001', value: '100001' },
  { label: '200001', value: '200001' },
];

const specificValueOptionDropdowns = {
  year: [
    { label: '2010', value: '2010' },
    { label: '2016', value: '2016' },
    { label: '2018', value: '2018' },
    { label: '2020', value: '2020' },
  ],
  make: CAR_MAKES,
  color: CAR_COLORS,
  state: STATES,
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
          <JSONRulesEngineVisualiser
            conditionSchema={TEST_CONDITION_SCHEMA}
            onSubmit={handleRuleSubmit}
            factNameDropdownOptions={boolean('Use dropdown for FACT NAME', false) ? factNameDropdownOptions : undefined}
            operatorDropdownOptions={
              /* eslint-disable-next-line no-nested-ternary */
              boolean('Use dropdown options for OPERATOR', false)
                ? (boolean('Use specific dropdown options for OPERATOR', false)
                  ? specificOperatorDropdownOptions
                  : generalOperatorDropdownOptions)
                : undefined
            }
            valueDropdownOptions={
              /* eslint-disable-next-line no-nested-ternary */
              boolean('Use dropdown options for VALUE', false)
                ? (boolean('Use specific dropdown options for VALUE', false)
                  ? specificValueOptionDropdowns
                  : generalValueDropdownOptions)
                : undefined
            }
          />
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
