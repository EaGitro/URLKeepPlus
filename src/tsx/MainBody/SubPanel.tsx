import React from 'react';

import { useState, useEffect } from 'react';

import objToClassname from '~/src/utilities/objToClassname';
import formatDataForSave from '~/src/utilities/formatDataForSave';
import formatDateObjForDataKey from '~/src/utilities/formatDateObjForDataKey';
import shortenUrl from '~/src/utilities/shortenUrl';
import setStorage_promise from '~/src/utilities/setStorage_promise';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import { StoragedData } from '~/src/tsTypes/propsTypes';
import { TabInfoObj } from '~/src/tsTypes/tabInfoTypes';
import { CssStyle } from '~/src/tsTypes/styleTypes'
import { SavedDataFormatProperties } from "~/src/tsTypes/SavedDataFormat";




type Props = {
    cssStyle: CssStyle;
    storagedData: StoragedData;
    setDataObjFunc: React.Dispatch<React.SetStateAction<StoragedData>>;
    tabsInfo: TabInfoObj[];
    selectedCheckBox: {
        state: Set<any>;
        setState: React.Dispatch<any>;
    }
}

export default function SubPanel(props: Props) {

    /**
     * ========= Keyword Group Memo ===================== 
     */


    let [stateKeywordInputtedVal, setStateKeyword] = useState("");
    let [stateGroupInputtedVal, setStateGroup] = useState("");
    let [stateNoteInputtedVal, setStateNote] = useState("");


    // window.windowSubpanelProps = props;
    // console.log("windowSubpanelProps",windowSubpanelProps)
    // console.log("subpanel prosps", props)
    // let selectedKeyword: string = "";
    // let selectedGroup: string = "";

    /**
     * make <li> list children of `savedKeywordsItems` and `savedGroupsItems`
     */


    let savedGroupsItems = props.storagedData.groupObj;
    let savedKeywordsItems = props.storagedData.keywordList;

    // if (savedKeywordsItems.length == 0) {
    //     console.log("null keywords")
    // }
    // if (Object.keys(savedGroupsItems).length == 0) {
    //     console.log("null groups")
    //     // savedGroupsItems = [null];
    // }


    let savedKeywordsItemsElements = savedKeywordsItems.map((x) => {
        function itemOnclick() {
            // console.log("savedKeywords clicked")
            setStateKeyword(x);
        }

        return (
            <li className='list-group-item list-group-item-action panel-list-item' key={x} onClick={itemOnclick}>{x}</li>
        )
    })

    // console.log("savedKeywordsItems mapped", savedKeywordsItems)

    let savedGroupsItemsElements = Object.keys(savedGroupsItems).map((x) => {
        function itemOnclick() {
            // console.log("savedGroups clicked");
            setStateGroup(x);

        }

        return (
            <li className='list-group-item list-group-item-action panel-list-item' key={x} onClick={itemOnclick}>{x}</li>
        )
    })
    // console.log("savedGroupsItems mapped", savedGroupsItems)



    /**
     * handle function of inputKeyword and inputGroup 
     */


    function handleChangeKeyword(e) {
        setStateKeyword(e.target.value)
    }
    function handleChangeGroup(e) {
        setStateGroup(e.target.value)
    }
    function handleChangeNote(e) {
        setStateNote(e.target.value)
    }





    /**
     * ======= SAVE BUTTON =========
     */


    /**
     * which box are selected
     */


    let storagedUrls = Object.keys(props.storagedData.mainDataObj).map((dateAndUrl) => {
        return dateAndUrl.split(" ")[2]
    })



    /**
     * chackbox select button handle func
     */

    function handleClickAllUnsaved() {
        let unsavedIds = props.tabsInfo.map((tabsInfoObj) => {
            if (!(storagedUrls.includes(tabsInfoObj.url))) {

                return tabsInfoObj.id;
            }

        })
        // console.log("unsavedIds", unsavedIds)
        let unsavedIdaSet = new Set(unsavedIds);
        if (unsavedIdaSet.has(undefined)) {
            unsavedIdaSet.delete(undefined)
        }
        props.selectedCheckBox.setState(unsavedIdaSet);
    }

    function handleClickSelectAll() {
        let allIds = props.tabsInfo.map((tabsInfoObj) => {
            return tabsInfoObj.id;
        })
        let selectAllSet = new Set(allIds);
        props.selectedCheckBox.setState(selectAllSet);
    }

    function handleClickDeselectAll() {
        let nullSet = new Set();
        props.selectedCheckBox.setState(nullSet);
    }


    /**
     * save button handle func
     */


    function handleClickSave() {
        let idsSetForSave = props.selectedCheckBox.state;
        if (idsSetForSave.size == 0) {
            window.alert("Nothing has been selected.")
            return
        }

        let dataObjForSave: { SavedDataFormatKey: SavedDataFormatProperties } | {} = {};
        for (let tabsInfoObj of props.tabsInfo) {
            if (idsSetForSave.has(tabsInfoObj.id)) {
                let element = formatDataForSave(            // formatted each data to save
                    formatDateObjForDataKey(new Date()),
                    shortenUrl(tabsInfoObj.url),
                    tabsInfoObj.title,
                    stateKeywordInputtedVal,
                    [stateGroupInputtedVal],
                    stateNoteInputtedVal,
                    {}
                )

                dataObjForSave[element[0]] = element[1]
            }
        }


        let isConfirmed = window.confirm(`Save ${Object.keys(dataObjForSave).length} items ?`)
        // console.log("comfirmed", isConfirmed)
        if (isConfirmed) {
            // console.log("conf")
            let msg = `${Object.keys(dataObjForSave).length} items\n`;
            if (!(props.storagedData.keywordList.includes(stateKeywordInputtedVal)) && (!(stateKeywordInputtedVal == ""))) {
                msg += `new keyword \"${stateKeywordInputtedVal}\"\n`
            }
            if (!(Object.keys(props.storagedData.groupObj).includes(stateGroupInputtedVal)) && (!(stateGroupInputtedVal == ""))) {
                msg += `new group \"${stateGroupInputtedVal}\"\n`
            }
            msg += "  have been registered"
            window.alert(msg);


            /**
             * save main data
             */



            let prevMainDataObj = props.storagedData.mainDataObj;
            let newMainDataObj = Object.assign(dataObjForSave, prevMainDataObj);
            let prevKeywordSet = new Set(props.storagedData.keywordList);
            let newKeywordSet = prevKeywordSet.add(stateKeywordInputtedVal);
            let newKeywordArr = [...newKeywordSet]
            let prevGroupObj = props.storagedData.groupObj;
            let newGroupObj = Object.assign(prevGroupObj, { [stateGroupInputtedVal]: {} })
            props.setDataObjFunc({
                keywordList: newKeywordArr,
                groupObj: newGroupObj,
                mainDataObj: newMainDataObj
            })




        } else {
            window.alert("Canceled");
            return;
        }



    }

    useEffect(() => {
        const saveMainData = async () => {
            // let defPropsMaindataobjJson = JSON.stringify(props.storagedData.mainDataObj)
            // if(defPropsMaindataobjJson == "{}"){
            //     return;
            // }
            if (Object.keys(props.storagedData.mainDataObj).length == 0) {
                return;
            }
            // console.log("save main data")
            await setStorage_promise({ "keywordList": props.storagedData.keywordList });
            await setStorage_promise({ "groupObj": props.storagedData.groupObj });
            await setStorage_promise({ "mainDataObj": props.storagedData.mainDataObj });
        }
        saveMainData();

    }, [props.storagedData])




    return (
        <div className={objToClassname(props.cssStyle)}>
            <ButtonToolbar className='h-25 p-1'>
                <ButtonGroup className='me-1'>
                    <Button variant="dark" onClick={handleClickAllUnsaved}>Select all unsaved</Button>
                    <Button variant="light" onClick={handleClickSelectAll}>Sellect all</Button>
                    <Button variant="light" onClick={handleClickDeselectAll}>Deselect all</Button>
                </ButtonGroup>

                <ButtonGroup className='w-20 ms-5'>
                    <Button variant='primary' onClick={handleClickSave}>SAVE</Button>
                </ButtonGroup>

            </ButtonToolbar>



            <Container className='h-75 pt-3'>
                <Row className='h-100'>
                    <Col xs={4} className='h-100'>
                        <div className='w-100 h-30'>
                            <input id='inputKeyword' placeholder="Keyword" value={stateKeywordInputtedVal} onChange={handleChangeKeyword}></input>

                        </div>
                        <div className='w-100 h-65 overflow-auto'>
                            <ul className='w-100 h-100 list-group list-group-flush'>
                                {savedKeywordsItemsElements}
                            </ul>
                        </div>
                    </Col>
                    <Col xs={4} className='h-100'>
                        <div className='w-100 h-30'>
                            <input id='inputGroup' placeholder="Group" value={stateGroupInputtedVal} onChange={handleChangeGroup}></input>

                        </div>
                        <div className='w-100 h-65 overflow-auto'>
                            <ul className='w-100 h-100 list-group list-group-flush'>
                                {savedGroupsItemsElements}
                            </ul>
                        </div>
                    </Col>
                    <Col xs={4} className='h-100'>
                        <div className='w-100 h-100'>
                            <textarea placeholder='note' className='h-90 w-80' value={stateNoteInputtedVal} onChange={handleChangeNote}></textarea>
                        </div>

                    </Col>
                </Row>
            </Container>

        </div>

    )
}

