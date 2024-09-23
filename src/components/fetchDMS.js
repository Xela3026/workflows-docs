
export const fetchDMS = (domainID, options) => {
    return fetch(`https://dms.yabbr.io/2022-05-31/namespaces?domain=${domainID}`, options)
      .then(response => {
        if (!response.ok) throw new Error('Request Error: ' + response.statusText);
        return response.json();
      });
};
  