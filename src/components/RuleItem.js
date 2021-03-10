import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SQFormTextField, SQFormDropdown } from '@selectquotelabs/sqform';
import OPERATOR_SQFORMDROPDOWN_OPTIONS from '../constants/operatorConstants';

const itemGridStyles = makeStyles({
  itemGrid: {
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

  return (
    <Grid container spacing={2} className={itemClasses.itemGrid}>
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
