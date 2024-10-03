// import libraries
import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeSnippet from './CodeSnippet.js';
import Environment from './Environment.js';
import TOCItemTree from '@theme/TOCItems/Tree';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import IsDarkMode from './IsDarkMode.js';
import { atomOneLight as lightCodeStyle, atomOneDark as darkCodeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { fetchDMS } from './fetchDMS.js';
import EnvironmentConfig from 'brand/EnvironmentConfig';


import { useSelector, useDispatch } from 'react-redux'
import { setEnv, setDocs } from './collectionSlice.js'

const Collection = ({record,collection}) => {
  // initialise useState variables
  // const [docs, setDocs] = useState(null);
  // const [env, setEnv] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(0);
  const [TOC, setTOC] = useState([]);
  const isDarkMode = IsDarkMode();
  const [collapsed, setCollapsed] = useState(true);

  const env = useSelector((state) => state.collection.env);

  const docs = useSelector((state) => state.collection.docs[`${record}_${collection}`])
  const dispatch = useDispatch();
  const workspaceId = EnvironmentConfig({ type: "workspaceId" });

  // fetch the API docs from DMS
  useEffect(() => {
    if (!docs || Object.keys(docs).length === 0) {
      setLoading(prev => prev + 1);
      fetchDMS(`${workspaceId}_api_docs_${collection}/${record}`, { method: 'GET' })
        .then(data => {
          dispatch(setDocs({
            "data": data.dms.docs,
            "record": record,
            "collection": collection,
          }));
        })
        .catch(err => {
          setError(err);
        }) 
        .finally(() => setLoading(prev => prev - 1));
    }
      
    if (Object.keys(env).length === 0) {
      setLoading(prev => prev + 1);
      fetchDMS(`${workspaceId}_api_docs_environment`, { method: 'GET' })
        .then(data => {
          dispatch(setEnv(data.dms.docs.environment.values));
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => setLoading(prev => prev - 1));
    }

  },[]);

  // create the right-hand nav table of contents after the docs have loaded
  useEffect(() => {
    if (docs && docs.item) {
      
      let items = docs.item;
      // map each item to a part of the TOC
      const newTOC = items.map(item=>{
        const header = item.request.method + ' ' + item.name;
        const id = formatID(header);
        return { id: id, value: header, children: [] }
      })
      setTOC(newTOC);
    }
  },[loading]);

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
    {loading === 0 && docs && !error && env && (<div>
      {/* interpolates the docs with the environemtn variables */}
      <Environment environment = {env} class="api">
        {Object.keys(TOC).length !== 0 && <div onClick={() => setCollapsed(!collapsed)} className={`collapsible ${collapsed ? 'closed': 'open'}`}>On this page</div>}
        {/* generate the table of contents for the requests */}
        <TOCItemTree toc={TOC} className={`new-table-of-contents ${collapsed ? 'hidden': ''}`} linkClassName="new-table-of-contents__link" id="toc" />
        {/* converts markdown input to HTML */}
        <h1>{docs.name}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{docs.description}</ReactMarkdown><br/>

        {/* formats the info about each request */}
        {items.map((item, index) => (
          <div class='request-item' key={index}>
            {/* request title with some scroll padding for the TOC */}
            {/* converts the title into an anchor ID for TOC */}
            <h1  className={"scroll-buffer"} id={formatID(item.request.method + ' ' + item.name)} key={`title-${index}`}>
            {/* colour-codes the request method and displays the full request name */}
            <span className={item.request.method.toLowerCase()} key={`method-${index}`}>{item.request.method}&nbsp;</span>{item.name}
            </h1>

            {/* display endpoint URL */}
            <ReactMarkdown remarkPlugins={[remarkGfm]} key={`url-${index}`}>{`\`${item.request.url.raw}\``}</ReactMarkdown>
            {/* display auth requirements depending on presence of auth in request details */}
            <p className={"bold"} key={`auth-${index}`}>Authentication Required: {item.request.header.length ? <span class="get" key={`yes-${index}`}>Yes</span> : <span class="delete" key={`no-${index}`}>No</span>}</p>
            {/* display endpoint description and put syntax-highlighting on the JSON */}
            <ReactMarkdown remarkPlugins={[remarkGfm]} key={`description-${index}`} 
            components={{
              code(props) {
                const {children, className, node, ...rest} = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={isDarkMode ? darkCodeStyle : lightCodeStyle}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                )
              }
            }}>
                {item.request.description}
            </ReactMarkdown>
            {/* generate a code snippet for the request for valid endpoints */}
            {item.request && item.request.url.raw.startsWith("{{") && <CodeSnippet request={item.request} environment ={env} collection={collection} record = {record} key={`code-${index}`} uid={`code-${index}`}/>}
            {/* divider between requests */}
            {index + 1 !== items.length && <ReactMarkdown remarkPlugins={[remarkGfm]} key={`divider-${index}`}>---</ReactMarkdown>}
            
          </div>
        ))}

        
      </Environment>
      
      
      </div>

    )}
    {/* handle request loading */}
    {loading > 0 && !error && (<div>
      <p><Skeleton count={1} height={"3em"} width={"50%"} baseColor={isDarkMode ? "#202020": ''} highlightColor={isDarkMode ? "#444": ''}/></p>
      <p><Skeleton count={1.5} baseColor={isDarkMode ? "#202020": ''} highlightColor={isDarkMode ? "#444": ''}/></p><br/>
      <p><Skeleton count={1} height={"3em"} width={"50%"} baseColor={isDarkMode ? "#202020": ''} highlightColor={isDarkMode ? "#444": ''}/></p>
      <p><Skeleton count={4.2} baseColor={isDarkMode ? "#202020": ''} highlightColor={isDarkMode ? "#444": ''}/></p>
      <p><Skeleton count={1} height={"2em"} width={"50%"} baseColor={isDarkMode ? "#202020": ''} highlightColor={isDarkMode ? "#444": ''}/></p>
      <p><Skeleton count={7.8} baseColor={isDarkMode ? "#202020": ''} highlightColor={isDarkMode ? "#444": ''}/></p>

      
      </div>
    )}
  </div>
);
};

export default Collection;
  
