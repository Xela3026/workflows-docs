import React, { Children, cloneElement } from 'react';

const Environment = ({ children }) => {
  // Define your regex pattern for replacement
  const regex = /{{API-URL}}/gi; // Example regex to replace 'apple' case-insensitively

  // Function to iterate through children and perform regex replacement
  const processChildren = (child) => {
    // Check if the child is a valid React element
    if (React.isValidElement(child)) {
      // If the child has text content as a string, perform regex replacement
      if (typeof child.props.children === 'string') {
        const modifiedText = child.props.children.replace(regex, 'test123');
        return cloneElement(child, {}, modifiedText);
      } else {
        // If the child is not a string, recursively process its children
        const processedChild = Children.map(child.props.children, processChildren);
        return cloneElement(child, {}, processedChild);
      }
    }
    // Return the child as is if it's not a valid React element
    return child;
  };

  // Process each child element recursively
  const processedChildren = Children.map(children, processChildren);

  return <div>{processedChildren}</div>;
};

export default Environment;
