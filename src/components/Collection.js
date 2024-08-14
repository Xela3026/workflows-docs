
import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeSnippet from './CodeSnippet.js';
import Environment from './Environment.js';
import TOCItemTree from '@theme/TOCItems/Tree';
import TOCItems from '@theme/TOCItems';

const Collection = ({record,collection}) => {
  const [docs, setDocs] = useState(null);
  const [env, setEnv] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [TOC, setTOC] = useState([]);

  const h2Pattern = /^## (.*)$/gm;


  useEffect(() => {
    // docs
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
    
    // env
    fetch(`https://dms.yabbr.io/2022-05-31/namespaces?domain=8fdc2e9e10b63176dde73c1bbed1bfe76d07e0f07c1e068f3177281bd642e1c7_api_docs_environment`, {
      method: 'GET',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request Error: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      setEnv(data.dms.docs.environment.values);
    })
    .catch(error => {
      setError(error);
    });

    

  },[]);

  useEffect(() => {
    if (docs && docs.item) {
      
      let items = docs.item;
      items.forEach(item => {
        const header = item.request.method + ' ' + item.name;
        const id = formatID(header);
        setTOC(prevTOC => [...prevTOC, { id: id, value: header, children: [] }]);

        
      })
    }
  },[isLoading]);

  const formatID = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  

  let items;

  if (docs && docs.item) {
    items = docs.item;
  } else {
    items = [];
  }


return (

  <div>
    {error && <div>{error.message}</div>}
    {docs && !error && env && (<div>
      <Environment environment = {env} class="api">
        
        {/* <h1>{docs.name}</h1> */}
        
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{docs.description}</ReactMarkdown>

        {items.map((item, index) => (
          <details>
            <summary  style={{scrollMarginTop:"2em",fontSize: "2em"}} id={formatID(item.request.method + ' ' + item.name)}>
            <span className={item.request.method.toLowerCase()}>{item.request.method}</span> {item.name}
            
              
            </summary>

            {/* <h1 key={index} style={{scrollMarginTop:"2em",fontSize: "2em"}}  id={formatID(item.request.method + ' ' + item.name)}>{item.request.method} {item.name} </h1> */}
            <ReactMarkdown remarkPlugins={[remarkGfm]} key={-1-index}>{`\`${item.request.url.raw}\``}</ReactMarkdown>
            <p style={{"font-weight":"bold"}}>Authentication Required: {item.request.header.length ? <span class="get">Yes</span> : <span class="delete">No</span>}</p>
            <ReactMarkdown remarkPlugins={[remarkGfm]} key={-1-index}>{item.request.description}</ReactMarkdown>
            {item.request && item.request.url.raw.startsWith("{{API-URL}}") && <CodeSnippet request={item.request} environment ={env}/>}

          </details>
        ))}

        
      </Environment><TOCItemTree toc={TOC} className="table-of-contents" linkClassName="table-of-contents__link" /></div>

    )}
    {isLoading && !error && (
      <div>Loading...</div>
    )}
  </div>
);
};

export default Collection;
  
