import React from 'react';

import MainPanel from '~/src/tsx/MainBody/MainPanel'
import SubPanel from '~/src/tsx/MainBody/SubPanel'

import { TabInfoObj } from '~/src/tsTypes/tabInfoTypes';

import { useState, useEffect } from 'react';



type Props = {
    // tabsInfo: any[]
}

export default function MainMenu(props: Props) {
/**
 * Get Tabs' info & reload
 */

    let tabInfos: any[] = [];
    let [state, setState] = useState(Array<any>);

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



    return (
        <>
            <MainPanel
                cssStyle={{ height: 'h-80', overflow: 'overflow-auto' }}
                tabsInfo={state}
            />
            <SubPanel
                cssStyle={{ height: 'h-20' }}
            />
        </>
    )
}