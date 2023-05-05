import React from 'react';

import {CssStyle} from '~/src/tsTypes/styleTypes'

import objToClassname from '~/src/utilities/objToClassname';


type Props = {
    cssStyle: CssStyle;
}

export default function SideMenu(props: Props){
    return(

        <div className={objToClassname(props.cssStyle)}>
            SideMenu
        </div>
    )
}