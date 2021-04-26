import React from 'react';
import RuleGroupDisplay from '../../src/components/RuleGroupDisplay';
import {
  expectedInitialValues,
  testConditionSchema,
} from '../testUtils/testConditionSchema';
import SQFormWrapper from '../testUtils/SQFormWrapper';

describe('RuleGroupDisplay', () => {
  beforeAll(() => {
  });
  it('renders properly', () => {
    const testComponent = render(
      <SQFormWrapper initialValues={expectedInitialValues} onSubmit={() => {}}>
        <RuleGroupDisplay livingConditionSchema={testConditionSchema} setLivingConditionSchema={() => {}} />
      </SQFormWrapper>,
    );
    expect(testComponent).toMatchSnapshot();
  });

  describe('DOM elements', () => {
    let testComponent;

    beforeEach(() => {
      testComponent = shallow(
        <SQFormWrapper initialValues={expectedInitialValues} onSubmit={() => {}}>
          <RuleGroupDisplay livingConditionSchema={testConditionSchema} setLivingConditionSchema={() => {}} />
        </SQFormWrapper>,
      ).find('RuleGroupDisplay').shallow();
    });

    it('has 2 rule groups', () => {
      expect(testComponent.find('RuleGroup')).toHaveLength(2);
    });

    it('has 3 rule items', () => {
      expect(testComponent.find('RuleItem')).toHaveLength(3);
    });
  });
});
