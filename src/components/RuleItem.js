import React from 'react';
import PropTypes from 'prop-types';
import { SQFormTextField, SQFormDropdown } from '@selectquotelabs/sqform';
import OPERATOR_SQFORMDROPDOWN_OPTIONS from '../constants/operatorConstants';

function RuleItem({
  ruleName,
}) {
  return (
    <>
      <SQFormTextField
        size={4}
        name={`${ruleName}_factName`}
        label="Fact Name"
        placeholder="Fact Name"
      />
      <SQFormDropdown
        size={4}
        name={`${ruleName}_operator`}
        label="Operator"
      >
        {OPERATOR_SQFORMDROPDOWN_OPTIONS}
      </SQFormDropdown>
      <SQFormTextField
        size={4}
        name={`${ruleName}_valueName`}
        label="Value"
        placeholder="Value"
      />
    </>
  );
}

RuleItem.propTypes = {
  /** Name of this particular rule */
  ruleName: PropTypes.string.isRequired,
};

export default RuleItem;
