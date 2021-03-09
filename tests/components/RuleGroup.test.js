import React from 'react';
import RuleGroup from '../../src/components/RuleGroup';
import SQFormWrapper from '../util/SQFormWrapper';

describe('RuleGroup', () => {
  it('renders properly', () => {
    const testRuleGroup = render(
      <SQFormWrapper initialValues={{ someName_expression: '' }}>
        <RuleGroup ruleGroupName="someName" />
      </SQFormWrapper>,
    );
    expect(testRuleGroup).toMatchSnapshot();
  });
});
