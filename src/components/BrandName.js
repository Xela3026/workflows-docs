import React from 'react';
import Interpolate from '@docusaurus/Interpolate';

const BrandName = ({ type }) => {
  const values = {
    name: 'Yabbr', // your brand's name
    lowerName: 'yabbr', // all lowercase brand name
    dms: 'https://dms.yabbr.io/2022-05-31', // DMS API URL
    workflow: 'https://workflows.yabbr.io/2022-02-14', // workflows API URL
    core: 'https://api.yabbr.io/2019-01-23', // core API URL
    custodian: 'https://custodian.yabbr.io/2022-02-02', // custodian API URL
    "workflows-url": "https://workflows.yabbr.io/workflows/", // workflows URL
    "details-page": "https://go.yabbr.io/#/workspace/details", // workspace details page URL
  };


  if (type === 'workflows-url' || type === 'details-page') {
    return (
      
      <a href={values[type]}>
        {values[type]}
      </a>
    );
  }


  return (
    <Interpolate>
      {values[type]}
    </Interpolate>
  );
}

export default BrandName;