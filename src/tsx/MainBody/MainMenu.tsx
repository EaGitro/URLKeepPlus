import React from 'react';

import MainPanel from '~/src/tsx/MainBody/MainPanel'
import SubPanel from '~/src/tsx/MainBody/SubPanel'



import MainPanelAlt from '~/src/tsx/MainBody/MainPanelAlt';
import SubPanelAlt from '~/src/tsx/MainBody/SubPanelAlt';

import { TabInfoObj } from '~/src/tsTypes/tabInfoTypes';
import { StoragedData } from '~/src/tsTypes/propsTypes';
import { PanelType, DateKeyGroup } from '~/src/tsTypes/panelTypes';

import { useState, useEffect } from 'react';



type Props = {
    storagedData: StoragedData;
    setDataObjFunc: React.Dispatch<React.SetStateAction<StoragedData>>;
    dateKeyGroupState: DateKeyGroup;
    panelState: PanelType;
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

    let [selectedCheckBoxState, setSelectedCheckBox] = useState(new Set());


    /**
     * alter panels
     */

    let [selectedCheckBoxAltState, setSelectedCheckBoxAlt] = useState(new Set());

    let [CategorizedStoragedDateAndUrlsState, setCategorizedStoragedDateAndUrls] = useState(new Set<string>());

    // /**
    //  * generate object storaged with the category
    //  */

    // let dataObjWithTheKey = {}


    // for (let i in props.storagedData.mainDataObj) {

    //     if (props.panelState == '_all_') {
    //         if (i.split(" ")[0] == props.dateKeyGroupState) {
    //             dataObjWithTheKey[i] = props.storagedData.mainDataObj[i]
    //         }

    //     } else if (props.panelState == '_keyword_') {
    //         if (props.storagedData.mainDataObj[i]["keyword"] == props.dateKeyGroupState) {
    //             dataObjWithTheKey[i] = props.storagedData.mainDataObj[i]
    //         }
    //     } else if (props.panelState == '_group_') {
    //         if (props.storagedData.mainDataObj[i]["group"] == props.dateKeyGroupState) {
    //             dataObjWithTheKey[i] = props.storagedData.mainDataObj[i]
    //         }
    //     }
    // }







    return (
        <>
            {(() => {
                if (props.panelState == '_current_') {
                    return <MainPanel
                        cssStyle={{ height: 'h-75', overflow: 'overflow-auto' }}
                        tabsInfo={tabsInfoState}
                        storagedData={props.storagedData}
                        setDataObjFunc={props.setDataObjFunc}
                        // whichButtonState={whichButton}
                        selectedCheckBox={{ state: selectedCheckBoxState, setState: setSelectedCheckBox }}
                    />
                } else {
                    return <MainPanelAlt
                        cssStyle={{ height: 'h-65', overflow: 'overflow-auto' }}
                        storagedData={props.storagedData}
                        setDataObjFunc={props.setDataObjFunc}
                        selectedCategory={props.panelState}
                        selectedCategoricalItem={props.dateKeyGroupState}
                        selectedCheckBox={{ state: selectedCheckBoxAltState, setState: setSelectedCheckBoxAlt }}
                        setCategorizedStoragedDateAndUrls={setCategorizedStoragedDateAndUrls}
                    />
                }




                // else if (props.panelState == '_all_') {
                //     return <MainPanelAll
                //         cssStyle={{ height: 'h-75', overflow: 'overflow-auto' }}
                //         storagedData={props.storagedData}
                //         setDataObjFunc={props.setDataObjFunc}
                //         date={props.dateKeyGroupState}
                //         selectedCheckBox={{ state: selectedCheckBoxAltState, setState: setSelectedCheckBoxAlt }}
                //     />

                // } else if (props.panelState == '_keyword_') {
                //     return <MainPanelKeyword
                //         cssStyle={{ height: 'h-75', overflow: 'overflow-auto' }}
                //         storagedData={props.storagedData}
                //         setDataObjFunc={props.setDataObjFunc}
                //         keyword={props.dateKeyGroupState}
                //         selectedCheckBox={{ state: selectedCheckBoxAltState, setState: setSelectedCheckBoxAlt }}
                //     />
                // } else {
                //     return <MainPanelGroup />
                // }

            })()}

            {(() => {

                if (props.panelState == '_current_') {
                    return <SubPanel
                        cssStyle={{ height: 'h-25', border: { position: 'border', addition: 'border-info border-2' }, rounded: 'rounded' }}
                        storagedData={props.storagedData}
                        setDataObjFunc={props.setDataObjFunc}
                        // setWhichButtonFunc={setWhichButton}
                        tabsInfo={tabsInfoState}
                        selectedCheckBox={{ state: selectedCheckBoxState, setState: setSelectedCheckBox }}
                    />
                } else {
                    return <SubPanelAlt
                        cssStyle={{ height: 'h-35', border: { position: 'border', addition: 'border-info border-2' }, rounded: 'rounded' }}
                        storagedData={props.storagedData}
                        setDataObjFunc={props.setDataObjFunc}
                        selectedCategory={props.panelState}
                        selectedCategoricalItem={props.dateKeyGroupState}
                        selectedCheckBox={{ state: selectedCheckBoxAltState, setState: setSelectedCheckBoxAlt }}
                        CategorizedStoragedDateAndUrlsState={CategorizedStoragedDateAndUrlsState}
                    />

                }




                // else if (props.panelState == '_all_') {
                //     return <SubPanelAll
                //         cssStyle={{ height: 'h-25', border: { position: 'border', addition: 'border-info border-2' }, rounded: 'rounded' }}
                //         storagedData={props.storagedData}
                //         setDataObjFunc={props.setDataObjFunc}
                //         date={props.dateKeyGroupState}
                //         selectedCheckBox={{ state: selectedCheckBoxState, setState: setSelectedCheckBox }}
                //     />
                // } else if (props.panelState == '_keyword_') {
                //     return <SubPanelKeyword
                //         cssStyle={{ height: 'h-25', border: { position: 'border', addition: 'border-info border-2' }, rounded: 'rounded' }}
                //         storagedData={props.storagedData}
                //         setDataObjFunc={props.setDataObjFunc}
                //         keyword={props.dateKeyGroupState}
                //         selectedCheckBox={{ state: selectedCheckBoxState, setState: setSelectedCheckBox }}
                //     />
                // } else {
                //     return <SubPanelGroup />
                // }
            })()}


        </>
    )
}