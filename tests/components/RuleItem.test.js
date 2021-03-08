import React from 'react';
import RuleItem from '../../src/components/RuleItem';
import getRuleItemInitialValues from '../util/getInitialValues';
import SQFormWrapper from '../util/SQFormWrapper';

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
