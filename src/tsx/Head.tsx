import React from 'react';

import {CssHeight, CssStyle} from '../tsTypes/styleTypes'


type Props = {
    cssStyle: CssStyle;
}

export default function Head(props: Props){
    return(
        <div className={props.cssStyle.height}>Head</div>
    )
}
