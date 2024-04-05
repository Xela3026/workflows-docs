import React, { useState } from 'react';

const Tag = ({ children, colour, borderColour, fontColour }) => {
    const [isHovered, setIsHovered] = useState(false);
    const darkenColor = (color, percent) => {
        const r = Math.max(0, Math.min(255, parseInt(color.substring(1, 3), 16)));
        const g = Math.max(0, Math.min(255, parseInt(color.substring(3, 5), 16)));
        const b = Math.max(0, Math.min(255, parseInt(color.substring(5, 7), 16)));
    
        const factor = 1 - percent; // Darkening factor
    
        const newR = Math.floor(r * factor);
        const newG = Math.floor(g * factor);
        const newB = Math.floor(b * factor);
    
        return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    };
    

    return (
        <span
            style={{
                backgroundColor: isHovered ? darkenColor(colour, 0.2) : colour,
                borderRadius: '0.3em',
                color: fontColour,
                padding: '0.2em 0.6em 0.3em 0.6em',
                whiteSpace: 'nowrap',
                border: '0.5px solid',
                borderColor:  isHovered ? darkenColor(borderColour, 0.2) : borderColour,
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                '-webkit-user-select':'none',
                '-ms-user-select': 'none',
                'user-select': 'none',

            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </span>
    );
};

export default Tag;
