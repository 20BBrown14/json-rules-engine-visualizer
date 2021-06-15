import React from 'react';
import { Card, Grid } from '@material-ui/core';
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
import createDocsPage from './utils/createDocsPage';

export default {
  title: 'JSON Rules Engine Visualiser Demo',
  component: JSONRulesEngineVisualiser,
  parameters: {
    docs: { page: createDocsPage({ showStories: false }) },
  },
};

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

const specificValueOption = {
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

const defaultArgs = {
  conditionSchema: TEST_CONDITION_SCHEMA,
  // eslint-disable-next-line no-console
  onSubmit: () => { console.log('submitted'); },
  factNameDropdownOptions: undefined,
  operatorDropdownOptions: undefined,
  valueDropdownOptions: undefined,
};

const Template = (args) => (
  (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <Card raised style={{ padding: 16, marginTop: 300 }}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <JSONRulesEngineVisualiser {...args} />
        </Card>
      </Grid>
    </Grid>
  )
);

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithFactNameOptions = Template.bind({});
WithFactNameOptions.args = {
  ...defaultArgs,
  title: 'With General Fact Name Options',
  factNameDropdownOptions,
};

export const WithGeneralOperatorOptions = Template.bind({});
WithGeneralOperatorOptions.args = {
  ...defaultArgs,
  title: 'With General Operator Options',
  operatorDropdownOptions: generalOperatorDropdownOptions,
};

export const WithSpecificOperatorOptions = Template.bind({});
WithSpecificOperatorOptions.args = {
  ...defaultArgs,
  title: 'With Specific Operator Options',
  factNameDropdownOptions,
  operatorDropdownOptions: specificOperatorDropdownOptions,
};

export const WithGeneralValueOptions = Template.bind({});
WithGeneralValueOptions.args = {
  ...defaultArgs,
  title: 'With General Value Options',
  valueDropdownOptions: generalValueDropdownOptions,
};

export const WithSpecificValueOptions = Template.bind({});
WithSpecificValueOptions.args = {
  ...defaultArgs,
  title: 'With Specific Value Options',
  factNameDropdownOptions,
  valueDropdownOptions: specificValueOption,
};
