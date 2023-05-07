import React from 'react';


import { CssStyle } from '../../tsTypes/styleTypes'

import objToClassname from '../../utilities/objToClassname';

import objToString from '~/src/utilities/objTostring';

// import {tmp} from '~/src/tsTypes/tmp';


type Props = {
    cssStyle: CssStyle;
    tabsInfo: any[];
}

// tmp();

export default function MainPanel(props: Props) {

    function toStr(arr: any[]) {
        console.log("arr",arr);
        let result = ''
        for (let i of arr) {
            console.log("toStr i",i)
            let tmp = objToString(i, " ");
            console.log("single str", tmp);
            result += tmp
        }
        console.log("toStr",result)
        return result
    }


    console.log("MainPanel", props.tabsInfo)
    return (
        <div className={objToClassname(props.cssStyle)}>
            MainPanel
            {
                toStr(props.tabsInfo)
            }

        </div>
    )
}