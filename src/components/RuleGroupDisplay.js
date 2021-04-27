import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import getRuleElementsFromSchema from '../util/getRuleElementsFromSchema';
import conditionSchemaPropType from '../util/proptypes';
import { GROUP_TYPE, RULE_TYPE } from '../constants/constants';

function RuleGroupDisplay({
  livingConditionSchema,
  setLivingConditionSchema,
}) {
  const addChildToGroup = React.useCallback((ruleGroupName, childTypeToAdd) => {
    const buildNewSchema = (existingSchema) => {
      let newConditionSchema = {};
      if (existingSchema.id === ruleGroupName) {
        newConditionSchema = {
          ...newConditionSchema,
          ...existingSchema,
          children: [
            ...existingSchema.children,
            (childTypeToAdd === GROUP_TYPE && {
              type: GROUP_TYPE,
              id: uuidv4(),
              condition: 'all',
              children: [],
            }),
            (childTypeToAdd === RULE_TYPE && {
              type: RULE_TYPE,
              id: uuidv4(),
              factName: '',
              operator: 'equal',
              value: '',
            }),
          ],
        };
        return newConditionSchema;
      }

      Object.entries(existingSchema).forEach(([key, value]) => {
        if (key === 'children' && value?.length) {
          newConditionSchema = {
            ...newConditionSchema,
            children: value.map((ruleInformationObject) => buildNewSchema(ruleInformationObject)),
          };

          return;
        }

        newConditionSchema = {
          ...newConditionSchema,
          [key]: value,
        };
      });

      return newConditionSchema;
    };

    setLivingConditionSchema(buildNewSchema(livingConditionSchema));
  }, [livingConditionSchema, setLivingConditionSchema]);

  const ruleElements = React.useMemo(
    () => (
      getRuleElementsFromSchema(livingConditionSchema, addChildToGroup, true)
    ), [getRuleElementsFromSchema, livingConditionSchema, addChildToGroup],
  );

  return (
    <Grid item sm={12} style={{ margin: 10, marginBottom: -25 }}>
      {ruleElements}
    </Grid>
  );
}

RuleGroupDisplay.propTypes = {
  livingConditionSchema: conditionSchemaPropType,
  setLivingConditionSchema: PropTypes.func.isRequired,
};

export default RuleGroupDisplay;
