import React from 'react';
import JSONRuleEngineVisualiser from '../../src/components/JSONRulesEngineVisualiser';

describe('JSONRuleEngineVisualiser', () => {
  it('renders properly', () => {
    const testComponent = render(<JSONRuleEngineVisualiser />);
    expect(testComponent).toMatchSnapshot();
  });
});
