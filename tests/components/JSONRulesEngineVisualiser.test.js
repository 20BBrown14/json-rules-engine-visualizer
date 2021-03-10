import React from 'react';
import JSONRuleEngineVisualiser from '../../src/components/JSONRulesEngineVisualiser';
import SQFormWrapper from '../testUtils/SQFormWrapper';
import { expectedInitialValues, testConditionSchema } from '../testUtils/testConditionSchema';

describe('JSONRuleEngineVisualiser', () => {
  it('renders properly', () => {
    const testComponent = render(
      <SQFormWrapper initialValues={expectedInitialValues}>
        <JSONRuleEngineVisualiser conditionSchema={testConditionSchema} />
      </SQFormWrapper>,
    );
    expect(testComponent).toMatchSnapshot();
  });
});
