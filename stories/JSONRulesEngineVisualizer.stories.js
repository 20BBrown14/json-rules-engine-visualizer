import React from 'react';
import Card from '@material-ui/core/Card';

import { JSONRulesEngineVisualizer } from '../src';

export default {
  title: 'JSON Rules Engine Visualizer',
};

export const visualizer = () => {
  return (
    <Card raised style={{padding: 16}}>
      <JSONRulesEngineVisualizer />
    </Card>
  );
};
