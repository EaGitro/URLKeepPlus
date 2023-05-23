import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SideMenu from '~/src/tsx/MainBody/SideMenu';



import MainMenu from '~/src/tsx/MainBody/MainMenu'

// import {CssHeight} from '../tsTypes/styleTypes'

import { CssStyle } from '~/src/tsTypes/styleTypes'
// import { TabInfoObj } from '~/src/tsTypes/tabInfoTypes';
// import getCurrentTabs from '~/src/utilities/getCurrentTabs';

import objToClassname from '~/src/utilities/objToClassname';

import getStrage_promise from '~/src/utilities/getStorage_promise';
import setStrage_promise from '~/src/utilities/setStorage_promise';

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


    let tmp: any[] = []
    let [dataObjState, setDataObj] = useState({
        keywordList: tmp,
        groupList: tmp,
        mainDataObj: {}
    });

    // async function assignDataToSet() {
    //     // (async () => {
    //     dataObjState.keywordList = await getStrage_promise("keywordList");
    //     dataObjState.groupList = await getStrage_promise("groupList");
    //     dataObjState.mainDataObj = await getStrage_promise("mainDataObj")
    //     // })()
    //     return
    // }

    useEffect(() => {
        const getMainData = async () => {
            console.log("getMainData")
            let getDefault: {
                [K: string]: any;
            } = await getStrage_promise(null);

            if (!(Object.keys(getDefault).includes("keywordList"))) {
                await setStrage_promise({ "keywordList": [] })
            }

            if (!(Object.keys(getDefault).includes("groupList"))) {
                await setStrage_promise({ "groupList": [1, 2] })
            }

            if (!(Object.keys(getDefault).includes("mainDataObj"))) {
                await setStrage_promise({ "mainDataObj": [] })
            }

            console.log("promise", await getStrage_promise(null));

            setDataObj({
                keywordList: await getStrage_promise("keywordList"),
                groupList: await getStrage_promise("groupList"),
                mainDataObj: await getStrage_promise("mainDataObj")
            })

        }
        getMainData();
    }, [])

    console.log("promise", getStrage_promise(null));

    console.log("dataObjDtate",dataObjState);

    return (
        <div className={objToClassname(props.cssStyle)}>
            <Container fluid className={objToClassname({ height: 'h-100' })}>
                <Row className={objToClassname({ height: 'h-100' })}>
                    <Col xs={"3"} className={objToClassname({ padding: 'p-0', height: 'h-100' })}>
                        <SideMenu
                            cssStyle={{ border: { position: 'border', addition: 'border-info border-1' }, rounded: 'rounded', height: 'h-100', width: 'w-100' }}
                        />
                    </Col>
                    <Col xs={"9"} className={objToClassname({ padding: 'p-0', height: 'h-100', border: { position: 'border', addition: 'border-info border-1' }, rounded: 'rounded' })}>
                        <MainMenu storagedData={dataObjState} setDataObjFunc={setDataObj}/>
                        {/* <MainMenu tabsInfo={tabInfos} /> */}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

