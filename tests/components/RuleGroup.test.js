import React from 'react';
import Button from '@material-ui/core/Button';
import RuleGroup from '../../src/components/RuleGroup';
import SQFormWrapper from '../testUtils/SQFormWrapper';

describe('RuleGroup', () => {
  it('renders properly', () => {
    const testRuleGroup = render(
      <SQFormWrapper initialValues={{ someName_expression: '' }}>
        <RuleGroup ruleGroupName="someName" addGroupClickHandler={() => {}} />
      </SQFormWrapper>,
    );
    expect(testRuleGroup).toMatchSnapshot();
  });

  describe('top group', () => {
    let testRuleGroup;

    beforeEach(() => {
      testRuleGroup = shallow(
        <SQFormWrapper initialValues={{ someName_expression: '' }}>
          <RuleGroup ruleGroupName="someName" addGroupClickHandler={() => {}} isTopGroup />
        </SQFormWrapper>,
      ).find('RuleGroup').shallow();
    });

    it('has 2 buttons', () => {
      expect(testRuleGroup.find(Button)).toHaveLength(2);
    });

    it('has 1 dropdown', () => {
      expect(testRuleGroup.find('#someName_dropdown')).toHaveLength(1);
    });

    describe('add group button click', () => {
      const mockAddGroupClickHandler = jest.fn();
      beforeEach(() => {
        testRuleGroup.setProps({ addGroupClickHandler: mockAddGroupClickHandler });
      });
    });
  });
});
