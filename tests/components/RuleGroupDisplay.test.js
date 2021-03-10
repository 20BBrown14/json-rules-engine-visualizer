import React from 'react';
import RuleGroupDisplay from '../../src/components/RuleGroupDisplay';
import { expectedInitialValues, testConditionSchema } from '../testUtils/testConditionSchema';
import SQFormWrapper from '../testUtils/SQFormWrapper';

describe('RuleGroupDisplay', () => {
  it('renders properly', () => {
    const testComponent = render(
      <SQFormWrapper initialValues={expectedInitialValues} onSubmit={() => {}}>
        <RuleGroupDisplay conditionSchema={testConditionSchema} />
      </SQFormWrapper>,
    );
    expect(testComponent).toMatchSnapshot();
  });
});
