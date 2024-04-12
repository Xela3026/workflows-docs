import React from 'react';
import Interpolate from '@docusaurus/Interpolate';

const BrandName = () => {
  return (
    <Interpolate
      values={{
        name: 'Yabbr',
      }}>
      {'{name}'}
    </Interpolate>
  );
}

export default BrandName;