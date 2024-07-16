import React, { Children, cloneElement, isValidElement } from 'react';


const Environment = ({ children, environment }) => {

  const regex = /{{PORTAL-URL}}/gi; 

  const envInterpolate = (string) => {
    environment.forEach(variable => {
    const regex = new RegExp(`{{${variable.key}}}`, 'g');
    string = string.replace(regex, variable.value);
    });
    return string;
  }

  const processChildren = (child) => {
    
    if (typeof child === 'string') {
      
      
      const modifiedText = envInterpolate(child);
      return modifiedText;
    };
    if (React.isValidElement(child) && child.props.children) {

        
        if (typeof child.props.children === 'string') {
            
          const modifiedText = envInterpolate(child.props.children);
          return cloneElement(child,{},modifiedText);
        }
        

        const modifiedChildren = child.props.children.map(innerChild => processChildren(innerChild));
        return cloneElement(child,{},modifiedChildren);

    };
    
    return child;
    };




  const processedChildren = Children.map(children, processChildren);

  return <div>{processedChildren}</div>;
};

export default Environment;

// const processChildren = (child) => {
//     if (isValidElement(child)) {
//       // Handle case where child.props.children is a string
//       if (typeof child.props.children === 'string') {
//         const modifiedText = child.props.children.replace(regex, 'test123');
//         return cloneElement(child, {}, modifiedText);
//       }
  
//       // Handle case where child.props.children is an array
//       if (Array.isArray(child.props.children)) {
//         const modifiedChildren = child.props.children.map(innerChild =>
//           processChildren(innerChild)
//         );
//         return cloneElement(child, {}, modifiedChildren);
//       }
  
//       // Handle case where child.props.children is a single element
//       if (isValidElement(child.props.children)) {
//         const modifiedChild = processChildren(child.props.children);
//         return cloneElement(child, {}, modifiedChild);
//       }
//     }
  
//     // Return the original child if it's not a valid React element or no modification needed
//     return child;
//   };
