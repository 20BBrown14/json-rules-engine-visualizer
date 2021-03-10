import React from 'react';
import Card from '@material-ui/core/Card';
import { DEFAULT_CONDITION_SCHEMA } from '../src/constants/constants';
import JSONRulesEngineVisualiser from '../src';

export default {
  title: 'JSON Rules Engine Visualiser',
};

export const visualiser = () => (
  <Card raised style={{ padding: 16, marginTop: 150 }}>
    <JSONRulesEngineVisualiser conditionSchema={DEFAULT_CONDITION_SCHEMA} />
  </Card>
);
