// import libraries
import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeSnippet from './CodeSnippet.js';
import Environment from './Environment.js';
import TOCItemTree from '@theme/TOCItems/Tree';
import TOCItems from '@theme/TOCItems';

const Collection = ({record,collection}) => {
  // initialise useState variables
  const [docs, setDocs] = useState(null);
  const [env, setEnv] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [TOC, setTOC] = useState([]);



  // fetch the API docs from DMS
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
      // handle loading times
      setIsLoading(false);
    })
    .catch(error => {
      setError(error);
      setIsLoading(false);
    });
    
    // fetch the environment variables from DMS
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

  // create the right-hand nav table of contents after the docs have loaded
  useEffect(() => {
    if (docs && docs.item) {
      
      let items = docs.item;
      // loop over each item in the API docs and make it an item in the table of contents
      items.forEach(item => {
        const header = item.request.method + ' ' + item.name;
        const id = formatID(header);
        setTOC(prevTOC => [...prevTOC, { id: id, value: header, children: [] }]);
      })
    }
  },[isLoading]);

  // converts request titles to valid anchor IDs for the TOC
  const formatID = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  
  // null handling
  let items;

  if (docs && docs.item) {
    items = docs.item;
  } else {
    items = [];
  }


return (

  <div>
    {/* display error if necessary */}
    {error && <div>{error.message}</div>}

    {/* display API docs */}
    {docs && !error && env && (<div>
      {/* interpolates the docs with the environemtn variables */}
      <Environment environment = {env} class="api">
        
        {/* converts markdown input to HTML */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{docs.description}</ReactMarkdown>

        {/* formats the info about each request */}
        {items.map((item, index) => (
          <div class='request-item' key={index}>
            {/* request title with some scroll padding for the TOC */}
            {/* converts the title into an anchor ID for TOC */}
            <h1  style={{scrollMarginTop:"2em",fontSize: "2em"}} id={formatID(item.request.method + ' ' + item.name)} key={`title-${index}`}>
            {/* colour-codes the request method and displays the full request name */}
            <span className={item.request.method.toLowerCase()} key={`method-${index}`}>{item.request.method}&nbsp;</span> {item.name}
            </h1>

            {/* display endpoint URL */}
            <ReactMarkdown remarkPlugins={[remarkGfm]} key={`url-${index}`}>{`\`${item.request.url.raw}\``}</ReactMarkdown>
            {/* display auth requirements depending on presence of auth in request details */}
            <p style={{"font-weight":"bold"}} key={`auth-${index}`}>Authentication Required: {item.request.header.length ? <span class="get" key={`yes-${index}`}>Yes</span> : <span class="delete" key={`no-${index}`}>No</span>}</p>
            {/* display endpoint description */}
            <ReactMarkdown remarkPlugins={[remarkGfm]} key={`description-${index}`}>{item.request.description}</ReactMarkdown>
            {/* generate a code snippet for the request for valid endpoints */}
            {item.request && item.request.url.raw.startsWith("{{") && <CodeSnippet request={item.request} environment ={env} key={`code-${index}`}/>}
            {/* divider between requests */}
            <ReactMarkdown remarkPlugins={[remarkGfm]} key={`divider-${index}`}>---</ReactMarkdown>
          </div>
        ))}

        
      </Environment>
      {/* generate the table of contents for the requests */}
      <TOCItemTree toc={TOC} className="table-of-contents" linkClassName="table-of-contents__link" /></div>

    )}
    {/* handle request loading */}
    {isLoading && !error && (
      <div>Loading...</div>
    )}
  </div>
);
};

export default Collection;
  
