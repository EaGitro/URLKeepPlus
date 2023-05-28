import React from 'react';


import { CssStyle } from '../../tsTypes/styleTypes'

import objToClassname from '~/src/utilities/objToClassname';
import parseDateTime from '~/src/utilities/parseDateTime';

import objToString from '~/src/utilities/objTostring';
// import { ListItem } from 'react-bootstrap/lib/Media';

import { useState, useEffect } from 'react';
import { TabInfoObj } from '~/src/tsTypes/tabInfoTypes';
import { PanelType, DateKeyGroup } from '~/src/tsTypes/panelTypes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { StoragedData } from '~/src/tsTypes/propsTypes';
import getStorage_promise from '~/src/utilities/getStorage_promise';
import setStorage_promise from '~/src/utilities/setStorage_promise';
import { Title } from 'react-bootstrap/lib/Modal';

// import {tmp} from '~/src/tsTypes/tmp';


type Props = {
    cssStyle: CssStyle;
    // tabsInfo: TabInfoObj[];
    storagedData: StoragedData;
    setDataObjFunc: React.Dispatch<any>;
    selectedCategory: PanelType;
    selectedCategoricalItem: DateKeyGroup;
    setCategorizedStoragedDateAndUrls: React.Dispatch<React.SetStateAction<Set<string>>>;
    selectedCheckBox: {
        state: Set<any>;
        setState: React.Dispatch<any>;
    }
}

// tmp();

export default function MainPanel(props: Props) {

    console.log("MainPanel props", props);
    console.log("Mainpanel storagedData", props.storagedData);
    window.windowMainpanelAltProps = props;

    /**
     * generate object storaged with the category
     */

    let dataObjWithTheKey = {}


    for (let i in props.storagedData.mainDataObj) {

        if (props.selectedCategory == '_all_') {
            if (i.split(" ")[0] == props.selectedCategoricalItem) {
                dataObjWithTheKey[i] = props.storagedData.mainDataObj[i]
            }

        } else if (props.selectedCategory == '_keyword_') {
            if (props.storagedData.mainDataObj[i]["keyword"] == props.selectedCategoricalItem) {
                dataObjWithTheKey[i] = props.storagedData.mainDataObj[i]
            }
        } else if (props.selectedCategory == '_group_') {
            if (props.storagedData.mainDataObj[i]["group"] == props.selectedCategoricalItem) {
                dataObjWithTheKey[i] = props.storagedData.mainDataObj[i]
            }
        }
    }

    let dateAndUrlSetTmp = Object.keys(dataObjWithTheKey)
    let urlSet = new Set(dateAndUrlSetTmp);

    useEffect(() => {
        props.setCategorizedStoragedDateAndUrls(urlSet);
    }, [props.storagedData])




    /**
     * handle func for each checkbox
     */


    function handleChangeCheckBox(e) {
        // let 

        let selectedSet = new Set(props.selectedCheckBox.state)
        if (selectedSet.has(e.target.value)) {
            console.log("selectedSet has")
            selectedSet.delete(Number(e.target.value));
            props.selectedCheckBox.setState(selectedSet);
        } else {
            console.log("selectedSet else")
            selectedSet.add(e.target.value);
            props.selectedCheckBox.setState(selectedSet);
        }
        console.log("selectedSet", selectedSet);
    }


    // console.log(props.tabsInfo)

    let listItems = Object.keys(dataObjWithTheKey).map((objKey) => {

        console.log(objKey, dataObjWithTheKey, dataObjWithTheKey[objKey]["title"])

        let url = objKey.split(" ")[2]

        return (
            <Container className='list-group-item list-group-item-action w-100' key={objKey}>
                <Row className='flex-nowrap w-100 m-0 p-0 h-100' >
                    <Col xs={1}>
                        <input className="form-check-input" type="checkbox"
                            value={objKey}
                            onChange={handleChangeCheckBox}
                            id={objKey}
                            checked={props.selectedCheckBox.state.has(objKey)}
                        />
                    </Col>
                    <Col xs={10}
                        onClick={
                            () => {
                                window.open(url, '_blank')
                            }
                        }
                        className={"h-100"}
                    >
                        <div className='breakword w-100 '>
                            <img src={`https://www.google.com/s2/favicons?domain_url=${new URL(url).hostname}`} className={"favicon"} />{" "}
                            {dataObjWithTheKey[objKey]["title"]}
                        </div>
                        <div className='breakword w-100 text-truncate text-secondary'>
                            {url}
                        </div>
                    </Col>
                </Row>
            </Container>

        )


    })





    // .map((tabsInfoObj) => {


    //     return (
    //         <Container className='list-group-item list-group-item-action w-100 h-100' key={tabsInfoObj.id}>
    //             <Row className='flex-nowrap w-100 m-0 p-0 h-100' >
    //                 <Col xs={1}>
    //                     <input className="form-check-input" type="checkbox"
    //                         value={tabsInfoObj.id}
    //                         onChange={handleChangeCheckBox}
    //                         id={String(tabsInfoObj.id)}
    //                         checked={props.selectedCheckBox.state.has(tabsInfoObj.id)}
    //                     />
    //                 </Col>
    //                 <Col xs={1}>
    //                     {(() => {
    //                         if (storagedUrls.includes(tabsInfoObj.url)) {
    //                             return "saved"
    //                         }
    //                     })()}
    //                 </Col>
    //                 <Col xs={10}
    //                     onClick={
    //                         () => {
    //                             chrome.tabs.update(tabsInfoObj.id, { active: true })
    //                         }
    //                     }
    //                     className={"h-100"}
    //                 >
    //                     <div className='breakword w-100 '>
    //                         <img src={tabsInfoObj.favIconUrl} className={"favicon"} />{" "}
    //                         {tabsInfoObj.title}
    //                     </div>
    //                     <div className='breakword w-100 text-truncate text-secondary'>
    //                         {tabsInfoObj.url}
    //                     </div>
    //                 </Col>

    //             </Row>
    //         </Container>
    //     )
    // })




    // console.log("MainPanel", props.tabsInfo)
    return (
        <>
            <Card>
                <Card.Title className='p-2'>
                    {props.selectedCategory == '_all_' ? parseDateTime(props.selectedCategoricalItem) : props.selectedCategoricalItem}
                </Card.Title>
            </Card>
            <div className={objToClassname(props.cssStyle)}>
                {/* MainPanel */}
                <div className={objToClassname({ width: 'w-100', height: 'h-100', list: { listGroup: 'list-group' }, margin: 'm-0', padding: 'p-0' })}>
                    {listItems}
                </div>



            </div>
        </>
    )
}