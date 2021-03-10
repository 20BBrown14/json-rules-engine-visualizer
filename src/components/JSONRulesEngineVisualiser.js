import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import getRuleElementsFromSchema from '../util/getRuleElementsFromSchema';

function JSONRulesEngineVisualiser({
  conditionSchema,
}) {
  return (
    <Grid item sm={12} style={{ margin: 10 }}>
      {getRuleElementsFromSchema(conditionSchema)}
    </Grid>
  );
}

JSONRulesEngineVisualiser.propTypes = {
  conditionSchema: PropTypes.shape({
    type: PropTypes.oneOf(['group', 'rule']).isRequired,
    id: PropTypes.string.isRequired,
    condition: PropTypes.oneOf(['any', 'all']),
    children: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default JSONRulesEngineVisualiser;
