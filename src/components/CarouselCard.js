// give each CarouselCard a different "order" value - 0,1,2,3 etc.
// then everytime the button is clicked, add 1/subtract 1 from that value.
// then use this order/index to calculate its distance from the centre.
// 0 should be the centre. negatives on the left. positives on the right.
// you can also use this to position the cards correctly. Multiply card length by order to get position.

/*
import React, { useState, useEffect, useRef } from 'react';

const CarouselCard = ({position, code, name, index }) => {

    const cardRef = useRef(null);
    const [position,changePosition] = useState(0);

    useEffect(() => {
        const container = cardRef.current.parentElement;
        const halfTotalCards = container.children.length;
        // difference between centre card and current
        const distanceFromCentre = Math.abs(position);
        
        // scale opacity and size based on distance
        const ratio = distanceFromCentre / halfTotalCards;

        
        const scale = 1 - ratio * 0.9;

        const z = 1000 - distanceFromCentre;
        changeZ(z);


        
        
        // update
        if (cardRef.current) {
            cardRef.current.style.transform = `scale(${scale})`;
            cardRef.current.style.zIndex = z;

        };
    });



    return (
        <div className="cards" ref={cardRef} style={{order: index}}>
            <div className='code-container'>
            &#123;<br/><br/>
            {code}<br/><br/>
            &#125;
            </div>
            <div className='header'>{name}{z}</div>
        </div>
    );
};

export default CarouselCard;*/


// index: what order does it appear left to right
// position: where is the card relative to the centre of the element



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
                    const initialOffset = (containerRect.right - cardRef.current.offsetWidth) / 2;
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






