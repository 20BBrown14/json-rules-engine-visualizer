import React from 'react';
import Card from '@material-ui/core/Card';

import { JSONRulesEngineVisualiser } from '../src';

export default {
  title: 'JSON Rules Engine Visualiser',
};

export const visualiser = () => (
  <Card raised style={{ padding: 16 }}>
    <JSONRulesEngineVisualiser />
  </Card>
);
