import React from 'react';
import TabulatedDetailComponent from '../TabulatedDetailComponent';

const PrimaryDetail = props => (
  <TabulatedDetailComponent
    {...props}
    appBarProps={{
      color: 'default',
      position: 'static',
    }}
  />
);

export default PrimaryDetail;
