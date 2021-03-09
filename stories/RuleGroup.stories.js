import React from 'react';
import { Card, Grid } from '@material-ui/core';
import { SQForm, SQFormButton } from '@selectquotelabs/sqform';
import RuleGroup from '../src/components/RuleGroup';
import RuleItem from '../src/components/RuleItem';

export default {
  title: 'Rule Group',
};

const defaultSubmitHandler = (formValues) => {
  // eslint-disable-next-line no-alert
  window.alert(JSON.stringify(formValues, null, 2));
};

export const ruleGroup = () => {
  const initialValues = {
    testGroup_expression: '',
    testGroupRuleOne_operator: '',
    testGroupRuleTwo_operator: '',
    anotherTestGroup_expression: '',
    anotherTestGroupRuleOne_operator: '',
    anotherTestGroupRuleTwo_operator: '',
    anotherTestGroupRuleThree_operator: '',
  };

  return (
    <Card raised style={{ padding: 16, marginTop: 150 }}>
      <SQForm
        initialValues={initialValues}
        onSubmit={defaultSubmitHandler}
        muiGridProps={{ spacing: 0 }}
      >
        <Grid item sm={12} style={{ margin: 10 }}>
          <RuleGroup ruleGroupName="testGroup">
            <RuleItem ruleName="testGroupRuleOne" />
            <RuleItem ruleName="testGroupRuleTwo" />
            <RuleGroup ruleGroupName="anotherTestGroup">
              <RuleItem ruleName="anotherTestGroupRuleOne" />
              <RuleItem ruleName="anotherTestGroupRuleTwo" />
              <RuleItem ruleName="anotherTestGroupRuleThree" />
            </RuleGroup>
          </RuleGroup>
        </Grid>
        <Grid item sm={12}>
          <Grid container justify="flex-end">
            <SQFormButton>Submit</SQFormButton>
          </Grid>
        </Grid>
      </SQForm>
    </Card>
  );
};
