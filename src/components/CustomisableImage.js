import React, { useState } from 'react';

import BorderImage from './BorderImage.js';

const CustomisableImage = ({ src, alt, width }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    document.body.style.overflow = clicked ? "auto" : "hidden";
    document.body.style.paddingRight = clicked ? "0px" : "16px";
  };


  return (
    <div onClick={handleClick}>
        <BorderImage src={src} alt={alt} width={width} />

        <div 
        className = {'overlay'} 
        style= {{
                opacity: clicked ? 1 : 0,
                visibility: clicked ? 'visible' : 'hidden',
                transition: 'opacity 0.3s ease, visibility 0.3s ease',
                }}
                >

            <div 
            className = {'enlarged'}
            >
                <p className={'subtitle'}>{alt}<span className={'exit'}>×</span></p>
                
                <img className={'enlargeImage'}
                src={src}
                alt={alt}

                />
                
                
            </div>
            
        </div>
        
    </div>
  );
};

export default CustomisableImage;
