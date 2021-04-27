import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SQFormDropdown, useSQFormContext } from '@selectquotelabs/sqform';
import { EXPRESSION_SQFORMDROPDOWN_OPTIONS, GROUP_TYPE, RULE_TYPE } from '../constants/constants';

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
  addChildToGroup,
  isTopGroup = false,
  children,
}) {
  const groupClasses = groupGridStyles();

  const { initialValues } = useSQFormContext();

  // Check if the initial values for this group exist yet
  const initialValue = Object.keys(initialValues).find((key) => (
    `${ruleGroupName}_expression` === key
  ));

  // If initial value doesn't exist don't render anything
  if (!initialValue) {
    return null;
  }

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
          onClick={() => { addChildToGroup(ruleGroupName, GROUP_TYPE); }}
        >
          Add Group
        </Button>
        <Button
          className={groupClasses.groupButton}
          variant="contained"
          size="small"
          onClick={() => { addChildToGroup(ruleGroupName, RULE_TYPE); }}
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
  /** Add child to group function */
  addChildToGroup: PropTypes.func.isRequired,
  /** Whether this group is the top group */
  isTopGroup: PropTypes.bool,
  /** The rules or group that are a part of this group */
  children: PropTypes.node,
};

export default RuleGroup;
