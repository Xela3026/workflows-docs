import React from 'react';
import Interpolate from '@docusaurus/Interpolate';

const EnvironmentConfig = ({ type }) => {
  const values = {
    name: 'Equifax Engage', // your brand's name
    baseUrl: 'equifaxengage.com', // your brand's primary domain
    dms: 'https://dms.equifaxengage.com/2022-05-31', // DMS API URL
    workflow: 'https://workflows.equifaxengage.com/2022-02-14', // workflows API URL
    core: 'https://api.equifaxengage.com/2019-01-23', // core API URL
    custodian: 'https://custodian.equifaxengage.com/2022-02-02', // custodian API URL
    workflowsUrl: "https://workflows.equifaxengage.com/workflows/", // workflows URL
    detailsPage: "https://go.equifaxengage.com/#/workspace/details", // workspace details page URL
    indefiniteArticle: "an", // the indefinite article that would precede your company name. Eg "*a* Tesla product" or "*an* Amazon product"
    workspaceId: "8fdc2e9e10b63176dde73c1bbed1bfe76d07e0f07c1e068f3177281bd642e1c7", // the ID of the workspace that conatins the namespaces/domains where your API docs are stored
  };


  if (type === 'workflowsUrl' || type === 'detailsPage') {
    return (
      
      <a href={values[type]}>
        {values[type]}
      </a>
    );
  } else if (type === "workspaceId") {
    return values[type];
  }


  return (
    <Interpolate>
      {values[type]}
    </Interpolate>
  );
}

export default EnvironmentConfig;