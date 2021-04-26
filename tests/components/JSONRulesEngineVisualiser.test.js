import React from 'react';
import JSONRulesEngineVisualiser from '../../src/components/JSONRulesEngineVisualiser';
import { testConditionSchema, expectedInitialValues } from '../testUtils/testConditionSchema';

describe('JSONRulesEngineVisualiser', () => {
  it('renders properly', () => {
    const testComponent = render(
      <JSONRulesEngineVisualiser conditionSchema={testConditionSchema} />,
    );

    expect(testComponent).toMatchSnapshot();
  });

  describe('DOM elements', () => {
    let testComponent;
    beforeEach(() => {
      testComponent = shallow(
        <JSONRulesEngineVisualiser conditionSchema={testConditionSchema} />,
      );
    });

    describe('SQForm', () => {
      it('has a form', () => {
        expect(testComponent.find('#json-rules-engine-visualiser-SQForm')).toHaveLength(1);
      });

      it('has the correct initialValues', () => {
        const form = testComponent.find('#json-rules-engine-visualiser-SQForm');
        expect(form.prop('initialValues')).toEqual(expectedInitialValues);
      });
    });

    describe('RuleGroupDisplay', () => {
      it('has a single RuleGroupDisplay', () => {
        expect(testComponent.find('RuleGroupDisplay')).toHaveLength(1);
      });

      describe('props', () => {
        const mockSetState = jest.fn();
        beforeEach(() => {
          jest.spyOn(React, 'useState').mockImplementation((init) => [init, mockSetState]);
          testComponent = shallow(<JSONRulesEngineVisualiser conditionSchema={testConditionSchema} />);
        });

        it('has the correct props', () => {
          const ruleGroupDisplay = testComponent.find('RuleGroupDisplay');
          expect(ruleGroupDisplay.prop('initialValues')).toEqual(expectedInitialValues);
          expect(ruleGroupDisplay.prop('livingConditionSchema')).toEqual(testConditionSchema);
          expect(ruleGroupDisplay.prop('setLivingConditionSchema')).toEqual(mockSetState);
        });
      });
    });
  });
});
