import React from 'react';

import MainPanel from '~/src/tsx/MainBody/MainPanel'
import SubPanel from '~/src/tsx/MainBody/SubPanel'

import { TabInfoObj } from '~/src/tsTypes/tabInfoTypes';

import { StoragedData } from '~/src/tsTypes/propsTypes';

import { useState, useEffect } from 'react';



type Props = {
    storagedData: StoragedData;
}

export default function MainMenu(props: Props) {
    /**
     * Get Tabs' info & reload
     */

    console.log("MainMenu props", props, props.storagedData.mainDataObj)
    let tmp: any[] = []
    let tabInfos: any[] = [];
    let [state, setState] = useState(tmp);

    console.log("MainBody");

    function callBackFuncGetTabs(tabs: any[]) {
        console.log(tabs);
        /* reduce the amount of info */

        let lightenedTabs: any[] = tabs.map(val => {
            let tmp: TabInfoObj =
            {
                "url": val["url"],
                "favIconUrl": val["favIconUrl"],
                "groupId": val["groupId"],
                "id": val["id"],
                "index": val["index"],
                "windowId": val["windowId"],
                "title": val["title"],
                "__compatible__": []
            }
            return tmp
        }
        )


        console.log(lightenedTabs);

        tabInfos = lightenedTabs;
        setState(tabInfos);
    }

    function getCurrentTabs() {
        chrome.tabs.query({}, callBackFuncGetTabs);
    }

    useEffect(() => {
        chrome.tabs.onDetached.addListener(getCurrentTabs);
        chrome.tabs.onMoved.addListener(getCurrentTabs);
        chrome.tabs.onRemoved.addListener(getCurrentTabs);
        chrome.tabs.onCreated.addListener(getCurrentTabs);
        chrome.tabs.onUpdated.addListener(getCurrentTabs);
        getCurrentTabs();
    }, [])


    /**
     * receive which check boxs are selected from MainPanel and send state to MainPanel(for receiving), to SubPanel(for save) 
     */


    return (
        <>
            <MainPanel
                cssStyle={{ height: 'h-75', overflow: 'overflow-auto' }}
                tabsInfo={state}
                storagedData={props.storagedData}
            />
            <SubPanel
                cssStyle={{ height: 'h-25', border: { position: 'border', addition: 'border-info border-2' }, rounded: 'rounded' }}
                storagedData={props.storagedData}
            />
        </>
    )
}