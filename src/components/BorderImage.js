import React, { useState } from 'react';

const BorderImage = ({ src, alt, width }) => {
  const [hovered, setHovered] = useState(false);


  return (
      <img
        src={src}
        alt={alt}
        width={width}
        className = {'custom-border'}
        style={{
          margin: '1em',
          'border-radius': '5px',
          boxShadow: hovered ? '0 4px 8px rgba(0, 0, 0, 0.5)' : 'none',
          backgroundColor: '#FFFFFF',
          cursor: 'pointer',
          transition: 'box-shadow 0.3s ease',}}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
  );
};

export default BorderImage;





