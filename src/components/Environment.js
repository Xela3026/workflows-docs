import React, { Children, cloneElement, isValidElement } from 'react';



const Environment = ({ children, environment }) => {

  // interpolates
  const envInterpolate = (string) => {
    // loop through environment variables and replace each placeholder with its value
    environment.forEach(variable => {
      const regex = new RegExp(`{{${variable.key}}}`, 'g');
      string = string.replace(regex, variable.value);
    });

    // const jsonPattern = /``` json([\s\S]*?)```/g;
    // string = string.replace(jsonPattern, (match, p1) => {
    //   return `<h1>${p1.trim()}</h1>`;
    // });

    return string;
  }

  // recursively checks if a HTML element's child is just a string, then interpolates it
  const processChildren = (child) => {
    // child is a string and can be interpolated
    if (typeof child === 'string') {
      
      
      const modifiedText = envInterpolate(child);
      // interpret string as HTML

      // ------------------- line of interest ------------------------
      return <span dangerouslySetInnerHTML={{ __html: modifiedText }} />;
      // -------------------------------------------------------------
    };
    // child has more children
    if (React.isValidElement(child) && child.props.children) {

        // child's child is a string that can be interpolated
        if (typeof child.props.children === 'string') {
            
          const modifiedText = envInterpolate(child.props.children);
          return cloneElement(child, {}, modifiedText);
        }
        
        // repeat to next layer of children
        const modifiedChildren = child.props.children.map(innerChild => processChildren(innerChild));
        return cloneElement(child,{},modifiedChildren);

    };
    
    return child;
    };


  const processedChildren = Children.map(children, processChildren);

  return <div>{processedChildren}</div>;
};

export default Environment;








