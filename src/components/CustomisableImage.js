import React, { useState } from 'react';

import BorderImage from './BorderImage.js';

const CustomisableImage = ({ src, alt, width }) => {
  const [clicked, setClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0 });

  const handleClick = () => {
    setClicked(!clicked);
    document.body.style.overflow = clicked ? "auto" : "hidden";
    document.body.style.paddingRight = clicked ? "0px" : "16px";
  };

  const handleMouseMove = (event) => {
    setMousePosition({x: event.clientX, y: event.clientY });

  };

  const calculateAngle = () => {
    // range of rotation angle
    const maxAngle = 10;
    const minAngle = -10;

    // calculate angle based on mouse position within the window width
    const anglex = ((mousePosition.x / window.innerWidth) * (maxAngle - minAngle)) + minAngle;
    const angley =  ((mousePosition.y / window.innerHeight) * (maxAngle - minAngle)) + minAngle;

    return [anglex, -angley];
  };

  const [phi, theta] = calculateAngle();


  return (
    <div onClick={handleClick} onMouseMove={handleMouseMove}>
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
                style={{'transform': "rotateY("+phi+"deg) rotateX("+theta+"deg)",}}

                />
                
                
            </div>
            
        </div>
        
    </div>
  );
};

export default CustomisableImage;
