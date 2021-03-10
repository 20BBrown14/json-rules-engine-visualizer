import React from 'react';
import PropTypes from 'prop-types';
import { SQForm } from '@selectquotelabs/sqform';

function SQFormWrapper({ initialValues = {}, children = '' }) {
  return (
    <SQForm
      initialValues={initialValues}
      onSubmit={() => {}}
    >
      {children}
    </SQForm>
  );
}

SQFormWrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object,
  children: PropTypes.node,
};

export default SQFormWrapper;
