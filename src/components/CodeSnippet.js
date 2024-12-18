// import necessary libraries
import React, {useState, useEffect, useRef} from 'react';
import codegen from 'postman-code-generators';
import sdk from 'postman-collection';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight as lightCodeStyle, atomOneDark as darkCodeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import IsDarkMode from './IsDarkMode.js';
import { useSelector, useDispatch } from 'react-redux';
import { setPreference, setSnippets } from './snippetSlice.js';

const CodeSnippet = ({request, environment, record, collection, uid}) => {


  // runs the environment variable interpolator internally
  const envInterpolate = (string) => {
    environment.forEach(variable => {
    const regex = new RegExp(`{{${variable.key}}}`, 'g');
    string = string.replace(regex, variable.value);
    });
    return string;
  }

  // initialise useState variables

  const [error, setError] = useState(null);
  const isDarkMode = IsDarkMode();
  const buttonRef = useRef(null);



  const selected = useSelector((state) => state.snippet.preference);
  const snippets = useSelector((state) => state.snippet.snippets[`${record}_${collection}_${uid}`]);
  const dispatch = useDispatch();



  // find out why C# language variants are not working - WIP

  // all POSTman-supported languages
  const languages = [
    ["C","libcurl"],
    ["cURL","cURL"],
    ["Dart","http"],
    ["Go","Native"],
    ["HTTP","HTTP"],
    ["Java","OkHttp"],
    ["Java","Unirest"],
    ["JavaScript","Fetch"],
    ["JavaScript","jQuery"],
    ["JavaScript","XHR"],
    ["Kotlin","OkHttp"],
    ["NodeJs","Axios"],
    ["NodeJs","Native"],
    ["NodeJs","Request"],
    ["NodeJs","Unirest"],
    ["Objective-C","NSURLSession"],
    ["OCaml","Cohttp"],
    ["PHP","cURL"],
    ["PHP","Guzzle"],
    ["PHP","pecl_http"],
    ["PHP","HTTP_Request2"],
    ["PowerShell","RestMethod"],
    ["Python","http.client"],
    ["Python","Requests"],
    ["R","httr"],
    ["R","RCurl"],
    ["Rust","Reqwest"],
    ["Shell","Httpie"],
    ["Shell","wget"],
    ["Swift","URLSession"],
  ]

  // formatting for the code snippet
  var options = {
    indentCount: 3,
    indentType: 'Space',
    trimRequestBody: true,
    followRedirect: true
  };

  
  
  // format the inputted request object for the code generator
  const requestObject = new sdk.Request(request);

  // generates all the code snippets for each language and stores them
  // loops over every language, runs it through the code generator with the inputted request object, and stores the output

  const generateSnippets = async () => {
    try {

      // wait for all snippets to be generated
      const newSnippets = await Promise.all(
        languages.map(([language, variant]) => {
          return new Promise((resolve) => {
            codegen.convert(language, variant, requestObject, options, (error, snippet) => {
              if (error) {
                setError('Error generating code snippet: ' + error);
                resolve(undefined);
              } else {
                snippet = envInterpolate(snippet);
                resolve({ snippet });
              }
            });
          });
        })
      );

      // get rid of undefined
      const filteredSnippets = newSnippets.filter(snippet => snippet !== undefined);
      
      dispatch(setSnippets({
        "data": filteredSnippets,
        "record": record,
        "collection": collection,
        "uid": uid,
      }));


    } catch (err) {
      setError('Error generating snippets: ' + err);
    }
  };
  
  // generate the snippets if they're not stored in redux
  // only run on mount
  useEffect(() => {
    
    if (!snippets || !snippets.length) {
      generateSnippets();
      
    }
  }, []);

  


  
  // error handling
  if (error) {
    return <div>{error}</div>;
  }

  // 1. temporarily disables the copy button
  // 2. copies the code snippet to clipboard
  // 3. re-enables the copy button
  const copyToClipboard = () => {
    const textToCopy = snippets[selected].snippet;
    navigator.clipboard.writeText(textToCopy).then(() => {
      const button = buttonRef.current;
      if (!button) {return;}

      button.textContent = 'Copied';
      button.classList.add('disabled');
      setTimeout(() => {
        button.textContent = 'Copy to Clipboard';
        button.classList.remove('disabled');

      }, 1000);
      
    }).catch((err) => {
      console.error('Error copying text: ', err);
    });
  };

  


  
  
  return (
    <div>
      {/* error handling */}
      {error && <div>{error.message}</div>}
      {/* if the snippet exists */}
      {snippets && snippets.length && !error && (<div>
        {/* generates the drop-down menu with all the language options */}
        <div className={'dropdown'}>
        {/* displays the selected language */}
        <div className={'prefix'}>{languages[selected][0]} - {languages[selected][1]}</div>
        <div className={'dropdown-content'}>
        {/* generate all the language options, and handle language selection on click */}
        {languages.map((item, index) => (
          <p key={index} onClick={() => {
            dispatch(setPreference(index)); 
            
            }} className={selected === index ? 'selected' : ''}>{item[0]} - {item[1]}</p>
        ))}
        </div>
        </div>
        <div className={"margin-top"}>

        {/* display the code in the selected language */}
        <div className='code'>
          <SyntaxHighlighter language={languages[selected][0].toLowerCase()} style={isDarkMode ? darkCodeStyle:lightCodeStyle} showLineNumbers={true} wrapLongLines={true}>{snippets[selected].snippet}</SyntaxHighlighter>

          {/* copy-to-clipboard button */}
          <button className="copy-btn" onClick={copyToClipboard} ref={buttonRef}>Copy to Clipboard</button>
        </div>
        </div>

</div>)}
    </div>

  )

};

export default CodeSnippet;



