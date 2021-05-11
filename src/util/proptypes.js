import PropTypes from 'prop-types';

const rulesEngineRulePropType = (
  PropTypes.exact({
    fact: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
  }).isRequired
);

const rulesEngineGroupPropType = (
  PropTypes.oneOfType([
    PropTypes.shape({
      any: PropTypes.arrayOf(PropTypes.oneOfType([rulesEngineRulePropType, PropTypes.object])).isRequired,
    }),
    PropTypes.shape({
      all: PropTypes.arrayOf(PropTypes.oneOfType([rulesEngineRulePropType, PropTypes.object])).isRequired,
    }),
  ])
);

const visualiserSchemaRulePropType = (
  PropTypes.exact({
    type: PropTypes.oneOf(['rule']).isRequired,
    id: PropTypes.string.isRequired,
    factName: PropTypes.string,
    operator: PropTypes.string,
    value: PropTypes.string,
  })
);

const visualiserSchemaGroupPropType = (
  PropTypes.shape({
    type: PropTypes.oneOf(['group']).isRequired,
    id: PropTypes.string.isRequired,
    condition: PropTypes.oneOf(['any', 'all']),
    // Children should actually be another visualiserSchemaGroupPropType or visualiserSchemaRulePropType
    // Doing it this way prevents console warnings
    children: PropTypes.arrayOf(PropTypes.object),
  })
);

/** Options to be used for the value dropdown
 * The object should have a key for each value in the factNameDropdownOptions
 * prop that indicate the possible values for that fact to have seperate values
 * for each fact. factNameDropdownOptions is required for this to operate properly.
 *
 * Otherwise, an array of options can be passed that'll be used for all facts.
 *
 */
export const valueDropdownOptionsPropType = (
  PropTypes.oneOfType([
    PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
        }),
      ),
    ),
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
      }),
    ),
  ])
);

export const visualiserSchemaPropType = (
  PropTypes.shape({
    type: PropTypes.oneOf(['group']).isRequired,
    id: PropTypes.string.isRequired,
    condition: PropTypes.oneOf(['any', 'all']),
    children: PropTypes.arrayOf(PropTypes.oneOfType([
      visualiserSchemaGroupPropType,
      visualiserSchemaRulePropType,
    ])),
  }).isRequired
);

export { rulesEngineGroupPropType as rulesEngineSchemaPropType };
