import React from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SQFormTextField, SQFormDropdown, useSQFormContext } from '@selectquotelabs/sqform';
import { operatorDropdownOptionsPropType, valueDropdownOptionsPropType } from '../util/proptypes';
import DEFAULT_OPERATORS from '../constants/operatorConstants';
import stringArrayToDropdownOptions from '../util/stringArrayToDropdownOptions';

const itemGridStyles = makeStyles({
  containerGrid: {
    background: 'white',
    width: '100%',
    border: '1px solid #b3b3b3',
    marginBottom: '25px',
    height: '80px',
  },
  deleteIcon: {
    padding: 0,
  },
});

function RuleItem({
  ruleName,
  removeRuleItem,
  factNameDropdownOptions,
  operatorDropdownOptions,
  valueDropdownOptions,
  updateAllFactNames,
}) {
  const DEFAULT_OPERATOR_OPTIONS = stringArrayToDropdownOptions(DEFAULT_OPERATORS);
  const itemClasses = itemGridStyles();

  const { initialValues, values } = useSQFormContext();

  const [selectedFactName, setSelectedFactName] = React.useState(initialValues[`${ruleName}_factName`]);

  React.useEffect(() => {
    updateAllFactNames(`${ruleName}_factName`, values[`${ruleName}_factName`]);
  }, [updateAllFactNames, values, ruleName]);

  const handleFactNameDropdownChange = React.useCallback(({ target: { value: newFactName } }) => {
    setSelectedFactName(newFactName);
  }, []);

  // Determine if SQForm has the values for these fields yet
  const initialValue = Object.keys(initialValues).find((key) => (
    `${ruleName}_factName` === key
      || `${ruleName}_operator` === key
      || `${ruleName}_value` === key
  ));

  const factField = React.useMemo(() => {
    if (factNameDropdownOptions) {
      return (
        <SQFormDropdown
          size={4}
          name={`${ruleName}_factName`}
          label="Fact Name"
          onChange={handleFactNameDropdownChange}
        >
          {factNameDropdownOptions}
        </SQFormDropdown>
      );
    }

    return (
      <SQFormTextField
        size={4}
        name={`${ruleName}_factName`}
        label="Fact Name"
        placeholder="Fact Name"
      />
    );
  }, [factNameDropdownOptions]);

  const operatorOptions = React.useMemo(() => {
    if (!operatorDropdownOptions) {
      return DEFAULT_OPERATOR_OPTIONS;
    }

    if (Array.isArray(operatorDropdownOptions)) {
      return operatorDropdownOptions;
    }

    // If is an object
    if (operatorDropdownOptions === Object(operatorDropdownOptions) && factNameDropdownOptions) {
      if (!selectedFactName || operatorDropdownOptions[selectedFactName]) {
        return operatorDropdownOptions[selectedFactName];
      }
    }

    return DEFAULT_OPERATOR_OPTIONS;
  }, [operatorDropdownOptions, factNameDropdownOptions]);

  const valueField = React.useMemo(() => {
    if (Array.isArray(valueDropdownOptions)) {
      return (
        <SQFormDropdown
          size={4}
          name={`${ruleName}_value`}
          label="Value"
        >
          {valueDropdownOptions}
        </SQFormDropdown>
      );
    }

    // If is object
    if (valueDropdownOptions === Object(valueDropdownOptions) && factNameDropdownOptions) {
      if (!selectedFactName || valueDropdownOptions[selectedFactName]) {
        return (
          <SQFormDropdown
            size={4}
            name={`${ruleName}_value`}
            label="Value"
            isDisabled={!selectedFactName}
          >
            {valueDropdownOptions[selectedFactName] ?? []}
          </SQFormDropdown>
        );
      }
    }

    return (
      <SQFormTextField
        size={4}
        name={`${ruleName}_value`}
        label="Value"
        placeholder="Value"
      />
    );
  }, [valueDropdownOptions, factNameDropdownOptions, selectedFactName]);

  // If the initialValues don't exist don't render anything
  // Check needs to be here to ensure hooks are rendered in same order
  if (!initialValue) {
    return null;
  }

  return (
    <Grid container spacing={2} className={itemClasses.containerGrid}>
      <Grid item sm={1}>
        <IconButton className={itemClasses.deleteIcon} onClick={() => { removeRuleItem(ruleName); }}>
          <DeleteIcon />
        </IconButton>
      </Grid>
      {factField}
      <SQFormDropdown
        size={3}
        name={`${ruleName}_operator`}
        label="Operator"
      >
        {operatorOptions}
      </SQFormDropdown>
      {valueField}
    </Grid>
  );
}

RuleItem.propTypes = {
  /** Name of this particular rule */
  ruleName: PropTypes.string.isRequired,
  /** Function to delete rule */
  removeRuleItem: PropTypes.func.isRequired,
  /** Options to be used for the fact dropdown. */
  factNameDropdownOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  })),
  /** Options to be used for the operator dropdown */
  operatorDropdownOptions: operatorDropdownOptionsPropType,
  /** Options to be used for the value dropdown */
  valueDropdownOptions: valueDropdownOptionsPropType,
  /** Function to update all fact names with new value */
  updateAllFactNames: PropTypes.func.isRequired,
};

export default RuleItem;
