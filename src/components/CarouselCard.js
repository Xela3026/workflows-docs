import React, { useState, useEffect, useRef } from 'react';

const CarouselCard = ({ code, name, offset, direction }) => {


    const cardRef = useRef(null);


    

    useEffect(() => {
        // This effect is used to calculate the distance of the card from the center and apply scaling
        const calculateDistance = () => {
            if (cardRef.current) {
                const container = cardRef.current.parentElement;
                if (container) {
                    const containerCentre = container.offsetWidth / 2;
                    const cardRect = cardRef.current.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    const cardCentre = cardRect.left + cardRect.width / 2 - containerRect.left + direction * cardRef.current.offsetWidth;
                    const distance = Math.floor(Math.abs(containerCentre - cardCentre));
                    const ratio = distance / container.offsetWidth;
                    const scale = 1 - ratio * 0.9;
                    const opacity = 1 - ratio;

                    // Update the scale transformation based on the new distance

                    
                    cardRef.current.style.transform = `translateX(${offset * cardRef.current.offsetWidth}px) scale(${scale})`;
                    cardRef.current.style.opacity = opacity;







                    
                }

            }
        };

        calculateDistance();




        // cleanup
        return () => {
            window.removeEventListener('resize', calculateDistance);
        };
    }, [offset]); // recalculate distance when the offset changes

    return (
        <div className="cards" ref={cardRef}>
            <div className='code-container' style={{whiteSpace: 'pre-wrap'}}>
                &#123;<br/><br/>
                {code}<br/><br/>
                &#125;
            </div>
            <div className='header'>{name}</div>
        </div>
    );
};

export default CarouselCard;






