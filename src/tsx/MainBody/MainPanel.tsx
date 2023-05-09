import React from 'react';


import { CssStyle } from '../../tsTypes/styleTypes'

import objToClassname from '../../utilities/objToClassname';

import objToString from '~/src/utilities/objTostring';
// import { ListItem } from 'react-bootstrap/lib/Media';

import { useState, useEffect } from 'react';
import { TabInfoObj } from '~/src/tsTypes/tabInfoTypes';
import Container from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StoragedData } from '~/src/tsTypes/propsTypes';
import getStrage_promise from '~/src/utilities/getStorage_promise';
import setStrage_promise from '~/src/utilities/setStorage_promise';

// import {tmp} from '~/src/tsTypes/tmp';


type Props = {
    cssStyle: CssStyle;
    tabsInfo: TabInfoObj[];
    storagedData: StoragedData;
}

// tmp();

export default function MainPanel(props: Props) {

    console.log("MainPanel props", props)
    console.log(props.storagedData)

    // let [mainDataObjState, setState] = useState({
    //     keywordList: Array<any>,
    //     groupList: Array<any>,
    //     mainDataObj: {}
    // });


    // useEffect(() => {
    //     const getMainData = async () => {
    //         let getDefault: {
    //             [K: string]: any;
    //         } = await getStrage_promise(null);

    //         if (!(Object.keys(getDefault).includes("keywordList"))) {
    //             await setStrage_promise({ "keywordList": [] })
    //         }
    //         if (!(Object.keys(getDefault).includes("groupList"))) {
    //             await setStrage_promise({ "groupList": [] })
    //         }
    //         if (!(Object.keys(getDefault).includes("mainDataObj"))) {
    //             await setStrage_promise({ "mainDataObj": [] })
    //         }

    //         console.log("promise", await getStrage_promise(null));

    //         setState(async ()=>{
    //             mainDataObjState.keywordList = await getStrage_promise("keywordList");
    //             mainDataObjState.groupList = await getStrage_promise("groupList");
    //             mainDataObjState.mainDataObj = await getStrage_promise("mainDataObj")
    //         })

    //     }
    //     getMainData();
    // }, [])

    let stragedUrls = Object.keys(props.storagedData.mainDataObj).map((dateAndUrl) => {
        return dateAndUrl.split(" ")[1]
    })



    console.log(props.tabsInfo)

    let listItems = props.tabsInfo.map((tabsInfoObj) => {


        return (
            <Container className='list-group-item list-group-item-action w-100' key={tabsInfoObj.id}>
                <Row className='flex-nowrap w-100 m-0 p-0' >
                    <Col xs={1}>
                        <input className="form-check-input" type="checkbox" value="" id={String(tabsInfoObj.id)} />
                    </Col>
                    <Col xs={1}>
                        {(() => {
                            if (tabsInfoObj.url in stragedUrls) {
                                return "saved"
                            }
                        })()}
                    </Col>
                    <Col xs={10}
                        onClick={
                            () => {
                                chrome.tabs.update(tabsInfoObj.id, { active: true })
                            }
                        }
                    >
                        <div className='breakword w-100'>
                            {tabsInfoObj.title}
                        </div>
                        <div className='breakword w-100 text-truncate text-secondary'>
                            {tabsInfoObj.url}
                        </div>
                    </Col>

                </Row>
            </Container>
        )
    })

    console.log("MainPanel", props.tabsInfo)
    return (
        <div className={objToClassname(props.cssStyle)}>
            {/* MainPanel */}
            <div className={objToClassname({ width: 'w-100', height: 'h-100', list: { listGroup: 'list-group' }, margin: 'm-0', padding: 'p-0' })}>
                {listItems}
            </div>



        </div>
    )
}