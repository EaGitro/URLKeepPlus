import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SideMenu from '~/src/tsx/MainBody/SideMenu';



import MainMenu from '~/src/tsx/MainBody/MainMenu'

// import {CssHeight} from '../tsTypes/styleTypes'

import { CssStyle } from '~/src/tsTypes/styleTypes'
import { TabInfoObj } from '~/src/tsTypes/tabInfoTypes';
// import getCurrentTabs from '~/src/utilities/getCurrentTabs';

import objToClassname from '~/src/utilities/objToClassname';

import { useState, useEffect } from 'react';


type Props = {
    cssStyle: CssStyle;
}


export default function MainBody(props: Props) {
    /**
     * Get Tabs' info & reload
     */

    let tabInfos: any[] = [];
    let [state, setState] = useState([0]);

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

    // chrome.tabs.onDetached.addListener(getCurrentTabs);
    // chrome.tabs.onMoved.addListener(getCurrentTabs);
    // chrome.tabs.onRemoved.addListener(getCurrentTabs);
    // chrome.tabs.onCreated.addListener(getCurrentTabs);
    // chrome.tabs.onUpdated.addListener(getCurrentTabs);
    // getCurrentTabs();
    // chrome.tabs.onUpdated.addListener(getCurrentTabs);

    // let [state, setState] = useState([0]);
    // useEffect(()=>{
    //     console.log("useEffect render")
    //     getCurrentTabs();
    //     setState(tabInfos);
    // }, [state])

    useEffect(()=>{
        chrome.tabs.onDetached.addListener(getCurrentTabs);
        chrome.tabs.onMoved.addListener(getCurrentTabs);
        chrome.tabs.onRemoved.addListener(getCurrentTabs);
        chrome.tabs.onCreated.addListener(getCurrentTabs);
        chrome.tabs.onUpdated.addListener(getCurrentTabs);
        getCurrentTabs();
    },[])


    return (
        <div className={objToClassname(props.cssStyle)}>
            <Container fluid className={objToClassname({ height: 'h-100' })}>
                <Row className={objToClassname({ height: 'h-100' })}>
                    <Col xs={"3"} className={objToClassname({ padding: 'p-0', height:'h-100' })}>
                        <SideMenu
                            cssStyle={{ border: { position: 'border', addition: 'border-danger border-1' }, height: 'h-100', width: 'w-100' }}
                        />
                    </Col>
                    <Col xs={"9"} className={objToClassname({ padding: 'p-0', height:'h-100' })}>
                        <MainMenu tabsInfo={state} />
                        {/* <MainMenu tabsInfo={tabInfos} /> */}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

