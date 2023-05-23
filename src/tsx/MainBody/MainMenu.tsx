import React from 'react';

import MainPanel from '~/src/tsx/MainBody/MainPanel'
import SubPanel from '~/src/tsx/MainBody/SubPanel'

import { TabInfoObj } from '~/src/tsTypes/tabInfoTypes';

import { StoragedData } from '~/src/tsTypes/propsTypes';

import { useState, useEffect } from 'react';



type Props = {
    storagedData: StoragedData;
    setDataObjFunc: React.Dispatch<any>;
}

export default function MainMenu(props: Props) {
    /**
     * Get Tabs' info & reload
     */

    console.log("MainMenu props", props, props.storagedData.mainDataObj)
    let tmpArrType: any[] = []
    let tabInfos: any[] = [];
    let [tabsInfoState, setTabsInfo] = useState(tmpArrType);

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
        setTabsInfo(tabInfos);
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

    type SelectedButtonType = 'SAU' | 'SA' | 'DA' | 'SAVE';

    let [whichButton, setWhichButton] = useState<SelectedButtonType>('DA');

    let [keywordGroupMemoState, setKGM] = useState({
        keyword: "",
        group: "",
        memo: ""
    });


    let [selectedCheckBoxState, setSelectedCheckBox] = useState(new Set());





    return (
        <>
            <MainPanel
                cssStyle={{ height: 'h-75', overflow: 'overflow-auto' }}
                tabsInfo={tabsInfoState}
                storagedData={props.storagedData}
                setDataObjFunc={props.setDataObjFunc}
                whichButtonState={whichButton}
                selectedCheckBox={{state: selectedCheckBoxState, setState: setSelectedCheckBox}}
            />
            <SubPanel
                cssStyle={{ height: 'h-25', border: { position: 'border', addition: 'border-info border-2' }, rounded: 'rounded' }}
                storagedData={props.storagedData}
                setDataObjFunc={props.setDataObjFunc}
                // setWhichButtonFunc={setWhichButton}
                tabsInfo={tabsInfoState}
                selectedCheckBox={{state: selectedCheckBoxState, setState: setSelectedCheckBox}}
            />
        </>
    )
}