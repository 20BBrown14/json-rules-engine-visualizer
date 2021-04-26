import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SQFormDropdown } from '@selectquotelabs/sqform';
import { EXPRESSION_SQFORMDROPDOWN_OPTIONS } from '../constants/constants';

const groupGridStyles = makeStyles({
  groupGrid: {
    background: 'rgb(233, 241, 241)',
    paddingBottom: '20px',
    border: '1px solid #b3b3b3',
    width: '100%',
    marginBottom: '25px',
  },
  nestedGroupGrid: {
    width: '100%',
    margin: 0,
  },
  groupButton: {
    margin: '0 3px',
  },
});

function RuleGroup({
  ruleGroupName,
  addGroupClickHandler,
  isTopGroup = false,
  children,
}) {
  const groupClasses = groupGridStyles();

  return (
    <Grid container spacing={2} justify="flex-start" className={groupClasses.groupGrid}>
      <SQFormDropdown
        id={`${ruleGroupName}_dropdown`}
        name={`${ruleGroupName}_expression`}
        label="Boolean Expression"
        size={3}
      >
        {EXPRESSION_SQFORMDROPDOWN_OPTIONS}
      </SQFormDropdown>
      <Grid item sm={6}>
        <Button
          id={`${ruleGroupName}_addGroupButton`}
          className={groupClasses.groupButton}
          variant="contained"
          size="small"
          onClick={() => { addGroupClickHandler(ruleGroupName); }}
        >
          Add Group
        </Button>
        <Button
          className={groupClasses.groupButton}
          variant="contained"
          size="small"
        >
          Add Rule
        </Button>
        {!isTopGroup && (
        <Button
          className={groupClasses.groupButton}
          variant="contained"
          size="small"
        >
          Remove
        </Button>
        )}
      </Grid>
      <Grid item sm={3} />
      <Grid item sm={1} />
      <Grid item sm={11}>
        <Grid container spacing={4} className={groupClasses.nestedGroupGrid}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}

RuleGroup.propTypes = {
  /** Name of the rule group */
  ruleGroupName: PropTypes.string.isRequired,
  /** Add Group button click handler */
  addGroupClickHandler: PropTypes.func.isRequired,
  /** Whether this group is the top group */
  isTopGroup: PropTypes.bool,
  /** The rules or group that are a part of this group */
  children: PropTypes.node,
};

export default RuleGroup;
