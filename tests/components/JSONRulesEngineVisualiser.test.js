import React from 'react';
import { DEFAULT_CONDITION_SCHEMA } from '../../src/constants/constants';
import JSONRulesEngineVisualiser from '../../src/components/JSONRulesEngineVisualiser';

describe('JSONRulesEngineVisualiser', () => {
  it('renders properly', () => {
    const testComponent = render(
      <JSONRulesEngineVisualiser conditionSchema={DEFAULT_CONDITION_SCHEMA} />,
    );

    expect(testComponent).toMatchSnapshot();
  });
});
