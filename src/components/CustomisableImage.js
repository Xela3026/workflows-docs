import React, { useState,useEffect } from 'react';

import BorderImage from './BorderImage.js';
import useBaseUrl from '@docusaurus/useBaseUrl';
import path from 'path';
const brandName = process.env.brand || 'yabbr';
const brandDirectory = `../../src/brands/${brandName}`;



const CustomisableImage = ({ src, alt, width }) => {
  const [clicked, setClicked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // pre loads the image
  useEffect(() => {

    const image = new Image();

    image.src = src;
    

    image.onload = () => {
      setLoaded(true);
    };
  }, [src]);

  // re navigates to the anchor link

  useEffect(() => {
    if (loaded) {

      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView();
        }
      }
    }
  }, [loaded]);

  // handle click event and reformat to account for scroll bar disappearing

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
