import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SideMenu from '~/src/tsx/MainBody/SideMenu';



import MainMenu from '~/src/tsx/MainBody/MainMenu'

// import {CssHeight} from '../tsTypes/styleTypes'

import { CssStyle } from '~/src/tsTypes/styleTypes'
import { StoragedData } from '~/src/tsTypes/propsTypes';
import { PanelType, DateKeyGroup } from '~/src/tsTypes/panelTypes';
// import { TabInfoObj } from '~/src/tsTypes/tabInfoTypes';
// import getCurrentTabs from '~/src/utilities/getCurrentTabs';

import objToClassname from '~/src/utilities/objToClassname';

import getStorage_promise from '~/src/utilities/getStorage_promise';
import setStorage_promise from '~/src/utilities/setStorage_promise';

import { useState, useEffect } from 'react';


type Props = {
    cssStyle: CssStyle;
}


export default function MainBody(props: Props) {
    /**
     * Get Tabs' info & reload
     */

    // let tabInfos: any[] = [];
    // let [state, setDataObj] = useState([0]);

    // console.log("MainBody");

    // function callBackFuncGetTabs(tabs: any[]) {
    //     console.log(tabs);
    //     /* reduce the amount of info */

    //     let lightenedTabs: any[] = tabs.map(val => {
    //         let tmp: TabInfoObj =
    //         {
    //             "url": val["url"],
    //             "favIconUrl": val["favIconUrl"],
    //             "groupId": val["groupId"],
    //             "id": val["id"],
    //             "index": val["index"],
    //             "windowId": val["windowId"],
    //             "title": val["title"],
    //             "__compatible__": []
    //         }
    //         return tmp
    //     }
    //     )


    //     console.log(lightenedTabs);

    //     tabInfos = lightenedTabs;
    //     setDataObj(tabInfos);
    // }

    // function getCurrentTabs() {
    //     chrome.tabs.query({}, callBackFuncGetTabs);
    // }

    // useEffect(()=>{
    //     chrome.tabs.onDetached.addListener(getCurrentTabs);
    //     chrome.tabs.onMoved.addListener(getCurrentTabs);
    //     chrome.tabs.onRemoved.addListener(getCurrentTabs);
    //     chrome.tabs.onCreated.addListener(getCurrentTabs);
    //     chrome.tabs.onUpdated.addListener(getCurrentTabs);
    //     getCurrentTabs();
    // },[])


    // =================================================

    /**
     * manage saved data (dataObjState)
     */


    // let tmp: any[] = []
    let [dataObjState, setDataObj] = useState<StoragedData>({
        keywordList: [],
        groupObj: {},
        mainDataObj: {}
    });

    // async function assignDataToSet() {
    //     // (async () => {
    //     dataObjState.keywordList = await getStorage_promise("keywordList");
    //     dataObjState.groupList = await getStorage_promise("groupList");
    //     dataObjState.mainDataObj = await getStorage_promise("mainDataObj")
    //     // })()
    //     return
    // }



    useEffect(() => {
        const getMainData = async () => {
            console.log("getMainData")
            let getDefault
                // : {
                //     [K: string]: any;
                // }
                = await getStorage_promise(null);

            // set default data
            if (!(Object.keys(getDefault).includes("keywordList"))) {
                console.log("init keywordList ")
                await setStorage_promise({ "keywordList": [] })
            }

            if (!(Object.keys(getDefault).includes("groupObj"))) {
                console.log("init groupObj")
                await setStorage_promise({ "groupObj": {} })
            }

            if (!(Object.keys(getDefault).includes("mainDataObj"))) {
                console.log("init mainDataObj");
                await setStorage_promise({ "mainDataObj": {} })
            }

            console.log("promise", await getStorage_promise(null));

            let objForSetDataObj = {
                keywordList: await getStorage_promise("keywordList"),
                groupObj: await getStorage_promise("groupObj"),
                mainDataObj: await getStorage_promise("mainDataObj")
            }
            console.log("objForSetDataObj", objForSetDataObj);

            // set state
            setDataObj({
                keywordList: await getStorage_promise("keywordList"),
                groupObj: await getStorage_promise("groupObj"),
                mainDataObj: await getStorage_promise("mainDataObj")
            })

        }
        getMainData();
    }, [])

    console.log("promise", getStorage_promise(null));

    console.log("dataObjDtate", dataObjState);


    /**
     * alter panels
     */

    let [panelState, setPanel] = useState<PanelType>('_current_');
    let [dateKeyGroupState, setDateKeyGroup] = useState<DateKeyGroup>("")




    return (
        <div className={objToClassname(props.cssStyle)}>
            <Container fluid className={objToClassname({ height: 'h-100' })}>
                <Row className={objToClassname({ height: 'h-100' })}>
                    <Col xs={"3"} className={objToClassname({ padding: 'p-0', height: 'h-100', overflow: "overflow-scroll" })}>
                        <SideMenu
                            cssStyle={{ border: { position: 'border', addition: 'border-info border-1' }, rounded: 'rounded', height: 'h-100', width: 'w-100' }}
                            setPanel={setPanel}
                            setDateKeyGroup={setDateKeyGroup}
                            storagedData={dataObjState}
                        />

                    </Col>
                    <Col xs={"9"} className={objToClassname({ padding: 'p-0', height: 'h-100', border: { position: 'border', addition: 'border-info border-1' }, rounded: 'rounded' })}>
                        <MainMenu
                            storagedData={dataObjState}
                            setDataObjFunc={setDataObj}
                            panelState={panelState}
                            dateKeyGroupState={dateKeyGroupState}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

