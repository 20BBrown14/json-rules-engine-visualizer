import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SQFormTextField, SQFormDropdown, useSQFormContext } from '@selectquotelabs/sqform';
import OPERATOR_SQFORMDROPDOWN_OPTIONS from '../constants/operatorConstants';

const itemGridStyles = makeStyles({
  containerGrid: {
    background: 'white',
    width: '100%',
    border: '1px solid #b3b3b3',
    marginBottom: '25px',
    height: '80px',
  },
});

function RuleItem({
  ruleName,
}) {
  const itemClasses = itemGridStyles();

  const { initialValues } = useSQFormContext();

  // Determine if SQForm has the values for these fields yet
  const initialValue = Object.keys(initialValues).find((key) => (
    `${ruleName}_factName` === key
      || `${ruleName}_operator` === key
      || `${ruleName}_value` === key
  ));

  // If the initialValues don't exist don't render anything
  if (!initialValue) {
    return null;
  }

  return (
    <Grid container spacing={2} className={itemClasses.containerGrid}>
      <SQFormTextField
        size={4}
        name={`${ruleName}_factName`}
        label="Fact Name"
        placeholder="Fact Name"
      />
      <SQFormDropdown
        size={4}
        name={`${ruleName}_operator`}
        label="Operator"
      >
        {OPERATOR_SQFORMDROPDOWN_OPTIONS}
      </SQFormDropdown>
      <SQFormTextField
        size={4}
        name={`${ruleName}_value`}
        label="Value"
        placeholder="Value"
      />
    </Grid>
  );
}

RuleItem.propTypes = {
  /** Name of this particular rule */
  ruleName: PropTypes.string.isRequired,
};

export default RuleItem;
