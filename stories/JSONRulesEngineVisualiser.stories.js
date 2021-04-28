import React from 'react';
import Card from '@material-ui/core/Card';
import JSONRulesEngineVisualiser from '../src';

export default {
  title: 'JSON Rules Engine Visualiser',
};

const TEST_ENGINE_SCHEMA = {
  any: [{
    fact: 'firstFact',
    operator: 'equal',
    value: 'firstValue',
  },
  {
    all: [{
      fact: 'secondFact',
      operator: 'notEqual',
      value: '5',
    }],
  },
  {
    all: [{
      fact: 'thirdFact',
      operator: 'equal',
      value: '20',
    }],
  },
  ],
};

export const visualiser = () => (
  <Card raised style={{ padding: 16, marginTop: 150 }}>
    <JSONRulesEngineVisualiser conditionSchema={TEST_ENGINE_SCHEMA} />
  </Card>
);
