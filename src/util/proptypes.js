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
