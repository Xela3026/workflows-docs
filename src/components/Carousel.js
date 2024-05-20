/*import React, { useState, useEffect, useRef } from 'react';

const Carousel = ({children}) => {
    const [rotation,setRotation] = useState(0);
    const totalChildren = React.Children.count(children);
    const halfTotalChildren = Math.floor(totalChildren / 2);

    const previous = () => {
        return
    }
    const next = () => {
        return
    }
    return (
        <div>
        
        <div className='card-row'>
        <div className="cover"></div>
            {React.Children.map(children, (child, index) => {
                // calculate position
                const position = index - halfTotalChildren;
                // clone each child and give properties
                return React.cloneElement(child, { index, position });

            })}
        </div>


        <button onClick={() => previous()}>Previous</button>
        <button onClick={() => next()}>Next</button>
        </div>
    );
}

export default Carousel;*/



import React, { useState, useRef, useEffect } from 'react';

const Carousel = ({ children }) => {
    const [offset,setOffset] = useState(1);
    const [direction,setDirection] = useState(1);
    const [isCooldown, setIsCooldown] = useState(false);
    const [loaded, setLoaded] = useState(false);



    const cooldownPeriod = 200; // Cooldown period in milliseconds

    // Function to rotate order to the right
    const handleNext = () => {
        if (!isCooldown && offset > -Math.floor(children.length / 2)) {
            setOffset((prevOffset) => prevOffset - 1);
            setDirection(-1);
            setIsCooldown(true);

            setTimeout(() => setIsCooldown(false), cooldownPeriod);
            
        }
    };

    // Function to rotate order to the left
    const handlePrevious = () => {
        if (!isCooldown && offset < Math.floor(children.length / 2)) {
            setOffset((prevOffset) => prevOffset + 1);
            setDirection(1);
            setIsCooldown(true);

            setTimeout(() => setIsCooldown(false), cooldownPeriod);
            
            
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setOffset(2);
            setDirection(1);
            setTimeout(() => {
                setOffset(3);
                setDirection(1);
                setLoaded(true);
            }, 220);
        }, 220);

        return () => clearTimeout(timer);

        
    }, []);

    




    return (
        <div style={{opacity: loaded ? 1 : 0 }}>

            <div className='card-row'>

                {React.Children.map(children, child=> {
                    return React.cloneElement(child, {offset, direction});
                })}
            </div>
            <button id="previous" onClick={handlePrevious}>Previous</button>
            <button id="next" onClick={handleNext}>Next</button>

        </div>
    );
};

export default Carousel;



// make a basic carousel with react
// scale the size based on position in the carousel









