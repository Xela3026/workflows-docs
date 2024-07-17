import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const codegen = require('postman-code-generators');
const sdk = require('postman-collection');










const CodeSnippet = ({request, environment}) => {

  const envInterpolate = (string) => {
    environment.forEach(variable => {
    const regex = new RegExp(`{{${variable.key}}}`, 'g');
    string = string.replace(regex, variable.value);
    });
    return string;
  }


  const [snippets, setSnippets] = useState([]);
  const [error, setError] = useState(null);
  const [selected,setSelected] = useState(0);

  // find out why C# language variants are not working - WIP

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


  var options = {
    indentCount: 3,
    indentType: 'Space',
    trimRequestBody: true,
    followRedirect: true
  };

  
  
  useEffect(() => {
    
    const requestObject = new sdk.Request(request);


    languages.forEach(group => {
      const [language, variant] = group;
      codegen.convert(language, variant, requestObject, options, (error, snippet) => {
        if (error) {
          setError('Error generating code snippet: ' + error);

        } else {
          snippet = envInterpolate(snippet);
          setSnippets(prevSnippets => [...prevSnippets, { snippet: "```\n" + snippet + "\n```" }]);
        }

      });
    });
  }, [selected]);

  if (error) {
    return <div>{error}</div>;
  }

  
  
  return (
    <div>
      {error && <div>{error.message}</div>}
      {/* {snippets && snippets.length > 0 && !error && (<div>
        <Dropdown list={languages} />
        <Tabs>
        {snippets.map((snippet, index) => (
          <TabItem value={`${languages[index][0]} - ${languages[index][1]}`} label={`${languages[index][0]} - ${languages[index][1]}`} default key={index}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}  key={index}>{snippet.snippet}</ReactMarkdown>
          </TabItem>
        ))}
      </Tabs></div>)} */}
      {snippets && snippets.length > 0 && !error && (<div>
        <div className={'dropdown'}>
        <div className={'prefix'}>{languages[selected][0]} - {languages[selected][1]}</div>
        <div className={'dropdown-content'}>
        {languages.map((item, index) => (
          <p key={index} onClick={() => setSelected(index)} className={selected === index ? 'selected' : ''}>{item[0]} - {item[1]}</p>
        ))}
        </div>
        </div>
        <div style={{'marginTop': "1em",}}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{snippets[selected].snippet}</ReactMarkdown>
        </div>

</div>)}
    </div>

  )

};

export default CodeSnippet;



