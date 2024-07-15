
import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeSnippet from './CodeSnippet.js';
import Environment from './Environment.js';

const Collection = ({record,collection}) => {
  const [docs, setDocs] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetch(`https://dms.yabbr.io/2022-05-31/namespaces?domain=8fdc2e9e10b63176dde73c1bbed1bfe76d07e0f07c1e068f3177281bd642e1c7_api_docs_${collection}/${record}`, {
        method: 'GET',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request Error: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      setDocs(data.dms.docs);
      setIsLoading(false);
    })
    .catch(error => {
      setError(error);
      setIsLoading(false);
    });
  },[]);

  let items;

  if (docs && docs.item) {
    items = docs.item
  };

return (

  <div>
    {error && <div>{error.message}</div>}
    {docs && !error && (
      <div>
        
        <h1>{docs.name}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{docs.description}</ReactMarkdown>

        {items.map((item, index) => (
          <div>
            <h1 key={index} style={{fontSize:"2em"}}>{item.request.method} {item.name}</h1>
            <ReactMarkdown remarkPlugins={[remarkGfm]}  key={index}>{item.request.description}</ReactMarkdown>
            {item.request && <CodeSnippet request={item.request}/>}
            
          </div>
        ))}


      </div>
    )}
    {isLoading && !error && (
      <div>Loading...</div>
    )}
  </div>
);
};

export default Collection;
  
