import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const codegen = require('postman-code-generators');
const sdk = require('postman-collection');
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';










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
    ["Python","Requests"],
    ["PHP","cURL"],
    

  ]

  const requestObject = new sdk.Request(request);

  let language;
  let variant;
  var options = {
    indentCount: 3,
    indentType: 'Space',
    trimRequestBody: true,
    followRedirect: true
  };
  
  useEffect(() => {
    const requestObject = new sdk.Request(request);
    const options = {
      indentCount: 3,
      indentType: 'Space',
      trimRequestBody: true,
      followRedirect: true
    };

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
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div>
      {error && <div>{error.message}</div>}
      {snippets && snippets.length > 0 && !error && (<Tabs>
        {snippets.map((snippet, index) => (
          <TabItem value={`${languages[index][0]} - ${languages[index][1]}`} label={`${languages[index][0]} - ${languages[index][1]}`} default key={index}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}  key={index}>{snippet.snippet}</ReactMarkdown>
          </TabItem>
        ))}
      </Tabs>)}
    </div>

  )

};

export default CodeSnippet;



