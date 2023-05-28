import React from 'react';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

export default function SideCustomToggle({ children, eventKey, setToggle, isToggle }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>{
        console.log("isToggle",isToggle)
        console.log('totally custom!');
        setToggle((prev) => {
            return !prev
        })
    }
    );




    return (
        <div
            // style={{ backgroundColor: 'pink' }}
            className={`${isToggle?"pt-2":"pb-2"} h-100`}
            onClick={decoratedOnClick}
        >
            {children}

        </div>
    );
}