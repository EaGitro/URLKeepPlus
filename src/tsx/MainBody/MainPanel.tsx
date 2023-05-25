import React from 'react';


import { CssStyle } from '../../tsTypes/styleTypes'

import objToClassname from '../../utilities/objToClassname';

import objToString from '~/src/utilities/objTostring';
// import { ListItem } from 'react-bootstrap/lib/Media';

import { useState, useEffect } from 'react';
import { TabInfoObj } from '~/src/tsTypes/tabInfoTypes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StoragedData } from '~/src/tsTypes/propsTypes';
import getStrage_promise from '~/src/utilities/getStorage_promise';
import setStrage_promise from '~/src/utilities/setStorage_promise';

// import {tmp} from '~/src/tsTypes/tmp';


type Props = {
    cssStyle: CssStyle;
    tabsInfo: TabInfoObj[];
    storagedData: StoragedData;
    setDataObjFunc: React.Dispatch<any>;
    whichButtonState: 'SAU' | 'SA' | 'DA' | 'SAVE';
    selectedCheckBox: {
        state: Set<any>;
        setState: React.Dispatch<any>;
    }
}

// tmp();

export default function MainPanel(props: Props) {

    console.log("MainPanel props", props);
    console.log("Mainpanel storagedData", props.storagedData);
    window.windowMainpanelProps = props;

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

    /**
     * generate straged urls arr
     */


    let stragedUrls = Object.keys(props.storagedData.mainDataObj).map((dateAndUrl) => {
        return dateAndUrl.split(" ")[1]
    })
    // let tmpArrType: any[] = [];
    // let [selectedCheckBoxState, setSelectedCheckBox] = useState(tmpArrType);

    // function handleChangeCheckBox(e) {
    //     // console.log(e);
    //     // console.log(e.target);
    //     // console.log(e.target.id)
    //     // console.log("selectedCheckBoxState", selectedCheckBoxState)
    //     // console.log(e.target.checked)
    //     let tmpSCBArr = props.selectedCheckBox.state;
    //     if (e.target.checked) {
    //         // console.log(1)

    //         let indexofSelectedCheckBox = tmpSCBArr.indexOf(e.target.id)
    //         if (indexofSelectedCheckBox != -1) {
    //             tmpSCBArr.splice(indexofSelectedCheckBox);
    //             props.selectedCheckBox.setState(tmpSCBArr)
    //             // setSelectedCheckBox(tmpSCBArr);
    //         }
    //     } else {
    //         // console.log(2)

    //         tmpSCBArr.push(e.target.id);
    //         props.selectedCheckBox.setState(tmpSCBArr)

    //         // setSelectedCheckBox(tmpSCBArr);
    //         // console.log("selectedCheckBoxState", selectedCheckBoxState)
    //     }

    //     e.target.checked = ! e.target.checked
    // }

    // // console.log("selectedCheckBoxState", selectedCheckBoxState);

    /**
     * handle func for each checkbox
     */


    function handleChangeCheckBox(e){
        // let 
        
        let selectedSet = new Set(props.selectedCheckBox.state)
        if(selectedSet.has(Number(e.target.value))){
            console.log("selectedSet has")
            selectedSet.delete(Number(e.target.value));
            props.selectedCheckBox.setState(selectedSet);
        }else{
            console.log("selectedSet else")
            selectedSet.add(Number(e.target.value));
            props.selectedCheckBox.setState(selectedSet);
        }
        console.log("selectedSet", selectedSet);
    }


    console.log(props.tabsInfo)

    let listItems = props.tabsInfo.map((tabsInfoObj) => {


        return (
            <Container className='list-group-item list-group-item-action w-100' key={tabsInfoObj.id}>
                <Row className='flex-nowrap w-100 m-0 p-0' >
                    <Col xs={1}>
                        <input className="form-check-input" type="checkbox"
                            value={tabsInfoObj.id}
                            onChange={handleChangeCheckBox}
                            id={String(tabsInfoObj.id)}
                            checked={props.selectedCheckBox.state.has(tabsInfoObj.id)}
                        />
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