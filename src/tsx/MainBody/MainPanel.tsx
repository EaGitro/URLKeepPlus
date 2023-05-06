import React from 'react';


import {CssStyle} from '../../tsTypes/styleTypes'

import objToClassname from '../../utilities/objToClassname';

// import {tmp} from '~/src/tsTypes/tmp';


type Props = {
    cssStyle: CssStyle;
    tabsInfo: {};
}

// tmp();

export default function MainPanel(props: Props){

    console.log("MainPanel",props.tabsInfo)
    return(
        <div className={objToClassname(props.cssStyle)}>
            MainPanel
            {/* {objToClassname(props.tabsInfo)} */}
            
        </div>
    )
}