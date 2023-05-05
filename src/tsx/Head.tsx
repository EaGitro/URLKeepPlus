import React from 'react';

import {CssHeight, CssStyle} from '~/src/tsTypes/styleTypes'

import objToClassname from '~/src/utilities/objToClassname';

type Props = {
    cssStyle: CssStyle;
}

export default function Head(props: Props){
    return(
        <div className={objToClassname(props.cssStyle)}>Head</div>
    )
}
