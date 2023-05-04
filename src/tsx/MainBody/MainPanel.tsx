import React from 'react';


import {CssStyle} from '../../tsTypes/styleTypes'

import objToClassname from '../../utilities/objToClassname';

// import {tmp} from '~/src/tsTypes/tmp';


type Props = {
    cssStyle: CssStyle;
}

// tmp();

export default function MainPanel(props: Props){
    return(
        <div className={objToClassname(props.cssStyle)}>
            MainPanel
            
        </div>
    )
}