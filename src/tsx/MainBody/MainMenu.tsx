import React from 'react';

import MainPanel from '~/src/tsx/MainBody/MainPanel'
import SubPanel from '~/src/tsx/MainBody/SubPanel'


type Props = {
    tabsInfo: {}
}

export default function MainMenu(props:Props) {

    return (
        <>
            <MainPanel
                cssStyle={{ height: 'h-85' }}
                tabsInfo={props}
            />
            <SubPanel
                cssStyle={{ height: 'h-15' }}
            />
        </>
    )
}