import React from 'react';
import RuleItem from '../../src/components/RuleItem';
import getRuleItemInitialValues from '../testUtils/getInitialValues';
import SQFormWrapper from '../testUtils/SQFormWrapper';

describe('RuleItem', () => {
  it('renders properly', () => {
    const testRuleItem = render(
      <SQFormWrapper initialValues={getRuleItemInitialValues('testRule')}>
        <RuleItem ruleName="testRule" />
      </SQFormWrapper>,
    );

    expect(testRuleItem).toMatchSnapshot();
  });
});
