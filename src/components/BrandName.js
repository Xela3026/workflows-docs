import React from 'react';
import Interpolate from '@docusaurus/Interpolate';

const BrandName = ({ type }) => {
  const values = {
    name: 'Yabbr',
    dms: 'dmstest',
    workflow: 'https://workflows.yabbr.io/2022-02-14',
    api: 'apitest',
    custodian: 'custodiantest',
  };
  // find the api urls for the others. All I can find are the dev URLs

  return (
    <Interpolate
    >
      {values[type]}
    </Interpolate>
  );
}

export default BrandName;