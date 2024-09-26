import React, { useState } from 'react';

const BorderImage = ({ src, alt, width }) => {
  const [hovered, setHovered] = useState(false);


  return (
      <img
        src={src}
        alt={alt}
        width={width}
        className = {'custom-border'}
        style={{boxShadow: hovered ? '0 4px 8px rgba(0, 0, 0, 0.5)' : 'none',}}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
  );
};

export default BorderImage;





