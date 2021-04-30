import PropTypes from 'prop-types';

const rulePropType = (
  PropTypes.exact({
    type: PropTypes.oneOf(['rule']).isRequired,
    id: PropTypes.string.isRequired,
    factName: PropTypes.string,
    operator: PropTypes.string,
    value: PropTypes.string,
  })
);

const groupPropType = (
  PropTypes.shape({
    type: PropTypes.oneOf(['group']).isRequired,
    id: PropTypes.string.isRequired,
    condition: PropTypes.oneOf(['any', 'all']),
    // Children should actually be another groupPropType or rulePropType
    // Doing it this way prevents console warnings
    children: PropTypes.arrayOf(PropTypes.object),
  })
);

const conditionSchemaPropType = (
  PropTypes.shape({
    type: PropTypes.oneOf(['group']).isRequired,
    id: PropTypes.string.isRequired,
    condition: PropTypes.oneOf(['any', 'all']),
    children: PropTypes.arrayOf(PropTypes.oneOfType([
      groupPropType,
      rulePropType,
    ])),
  })
);

export default conditionSchemaPropType;
