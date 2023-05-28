import React from 'react';

import { useState, useEffect } from 'react';

import objToClassname from '~/src/utilities/objToClassname';
import setStorage_promise from '~/src/utilities/setStorage_promise';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import { StoragedData } from '~/src/tsTypes/propsTypes';
import { CssStyle } from '~/src/tsTypes/styleTypes'
import { SavedDataFormatProperties } from "~/src/tsTypes/SavedDataFormat";
import { PanelType, DateKeyGroup } from '~/src/tsTypes/panelTypes';




type Props = {
    cssStyle: CssStyle;
    storagedData: StoragedData;
    setDataObjFunc: React.Dispatch<React.SetStateAction<StoragedData>>;
    selectedCategory: PanelType;
    selectedCategoricalItem: DateKeyGroup;
    selectedCheckBox: {
        state: Set<any>;
        setState: React.Dispatch<any>;
    }
    CategorizedStoragedDateAndUrlsState: Set<string>
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
    //     // console.log("null keywords")
    // }
    // if (Object.keys(savedGroupsItems).length == 0) {
    //     // console.log("null groups")
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


    // let storagedUrlsWithThisCategory = Object.keys(props.storagedData.mainDataObj).map((dateAndUrl) => {
    //     return dateAndUrl.split(" ")[2]
    // })



    /**
     * chackbox select button handle func
     */

    function handleClickOpenAll() {
        let urlList = [...props.CategorizedStoragedDateAndUrlsState].map((x) => {
            return x.split(" ")[2]
        })

        for (let i of urlList) {
            window.open(i, '_blank')
        }
    }

    function handleClickOpenSelectedItems() {
        let urlList = [...props.selectedCheckBox.state].map((x) => {
            return x.split(" ")[2]
        })

        urlList = [... new Set(urlList)];
        for (let i of urlList) {
            window.open(i, '_blank')
        }
    }


    function handleClickSelectAll() {
        props.selectedCheckBox.setState(props.CategorizedStoragedDateAndUrlsState);
    }

    function handleClickDeselectAll() {
        let nullSet = new Set();
        props.selectedCheckBox.setState(nullSet);
    }


    /**
     * delete button handle func
     */


    function handleClickDelete() {
        let dateAndUrlsToDelete = props.selectedCheckBox.state;
        if (dateAndUrlsToDelete.size == 0) {
            window.alert("Nothing has been selected.")
            return
        }

        let dataObjForSave: { SavedDataFormatKey: SavedDataFormatProperties } | {} = {};
        for (let objKey in props.storagedData.mainDataObj) {
            if (!(dateAndUrlsToDelete.has(objKey))) {
                dataObjForSave[objKey] = props.storagedData.mainDataObj[objKey]
            }
        }


        let isConfirmed = window.confirm(`Delete ${dateAndUrlsToDelete.size} items ?`)
        // console.log("comfirmed", isConfirmed)
        if (isConfirmed) {

            /**
             * save main data
             */

            props.setDataObjFunc({
                keywordList: props.storagedData.keywordList,
                groupObj: props.storagedData.groupObj,
                mainDataObj: dataObjForSave
            })




        } else {
            window.alert("Canceled");
            return;
        }



    }



    /**
     * rewrite setting
     */

    let [isRewrite, setIsRerwite] = useState(false);

    function handleClickRewrite() {
        setIsRerwite((prev) => {
            return !prev
        })

        if (!isRewrite) {
            return;
        }


    }



    function handleClickConfirmRewrite() {
        let dateAndUrlSetToRewrite = props.selectedCheckBox.state;
        if (dateAndUrlSetToRewrite.size == 0) {
            window.alert("Nothing has been selected.");
            return
        }
        let dataObjForSave = structuredClone(props.storagedData.mainDataObj)
        for (let objKey in dataObjForSave) {
            if (dateAndUrlSetToRewrite.has(objKey)) {


                dataObjForSave[objKey]["keyword"] = stateKeywordInputtedVal;
                dataObjForSave[objKey]["group"] = [stateGroupInputtedVal];
                dataObjForSave[objKey]["note"] = stateNoteInputtedVal;

            }
        }


        let isConfirmed = window.confirm(`Rerite setting of ${Object.keys(dataObjForSave).length} items ?`)
        // console.log("comfirmed", isConfirmed)
        if (isConfirmed) {
            console.log("conf")
            let msg = `${Object.keys(dataObjForSave).length} items\n`;
            if (!(props.storagedData.keywordList.includes(stateKeywordInputtedVal)) && (!(stateKeywordInputtedVal == ""))) {
                msg += `new keyword \"${stateKeywordInputtedVal}\"\n`
            }
            if (!(Object.keys(props.storagedData.groupObj).includes(stateGroupInputtedVal)) && (!(stateGroupInputtedVal == ""))) {
                msg += `new group \"${stateGroupInputtedVal}\"\n`
            }
            msg += "  have been overwrited or registered"
            window.alert(msg);


            /**
             * save main data
             */



            let prevKeywordSet = new Set(props.storagedData.keywordList);
            let newKeywordSet = prevKeywordSet.add(stateKeywordInputtedVal);
            let newKeywordArr = [...newKeywordSet]
            let prevGroupObj = props.storagedData.groupObj;
            let newGroupObj = Object.assign(prevGroupObj, { [stateGroupInputtedVal]: {} })
            props.setDataObjFunc({
                keywordList: newKeywordArr,
                groupObj: newGroupObj,
                mainDataObj: dataObjForSave
            })

            props.selectedCheckBox.setState(new Set());
            setIsRerwite(false);
        } else {
            window.alert("Canceled");
            setIsRerwite(false);
            return;
        }
    }


    function handleClickCancelRewrite() {

        setIsRerwite(false);
    }












    useEffect(() => {
        const saveMainData = async () => {
            // let defPropsMaindataobjJson = JSON.stringify(props.storagedData.mainDataObj)
            // if (defPropsMaindataobjJson == "{}") {
            //     return;
            // }
            if (Object.keys(props.storagedData.mainDataObj).length == 0) {
                return;
            }

            console.log("save main data");
            await setStorage_promise({ "keywordList": props.storagedData.keywordList });
            await setStorage_promise({ "groupObj": props.storagedData.groupObj });
            await setStorage_promise({ "mainDataObj": props.storagedData.mainDataObj });
        }
        saveMainData();

    }, [props.storagedData])




    return (<div className={objToClassname(props.cssStyle)}>

        <ButtonToolbar className={`h-20 ps-1 ${isRewrite ? "justify-content-end" : "justify-content-between"}  flex-nowrap`}>
            {isRewrite ? "" :
                <ButtonGroup className=''>
                    <Button variant="dark" onClick={handleClickOpenAll} className='p-1'>Open all</Button>
                    <Button variant="dark" onClick={handleClickOpenSelectedItems} className='p-1'>Open Selected Items</Button>
                    <Button variant="light" onClick={handleClickSelectAll} className='p-1'>Select all</Button>
                    <Button variant="light" onClick={handleClickDeselectAll} className='p-1'>Deselect all</Button>

                </ButtonGroup>

            }





            {isRewrite ?
                <ButtonGroup className='w-40 '>
                    <Button variant='dark' onClick={handleClickCancelRewrite} className='p-1'>
                        {"Cancel? "}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                        </svg>
                    </Button>

                    <Button variant='danger' onClick={handleClickConfirmRewrite} className='p-1'>
                        {"Confirm? "}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                        </svg>
                    </Button>
                </ButtonGroup>

                :

                <ButtonGroup className='w-40 '>
                    <Button variant='warning' onClick={handleClickRewrite} className='p-1'>
                        {"Rewrite Items' Setting? "}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                        </svg>
                    </Button>
                    <Button variant='danger' onClick={handleClickDelete} className='p-1'>
                        {"Delete Items? "}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                        </svg>
                    </Button>
                </ButtonGroup>

            }


        </ButtonToolbar>


        {/* <div className={objToClassname(props.cssStyle)}>
        <ButtonToolbar className='h-20 ps-1 justify-content-between  flex-nowrap'>
            <ButtonGroup className=''>
                <Button variant="dark" onClick={handleClickOpenAll} className='p-1'>Open all</Button>
                <Button variant="dark" onClick={handleClickOpenSelectedItems} className='p-1'>Open Selected Items</Button>
                <Button variant="light" onClick={handleClickSelectAll} className='p-1'>Select all</Button>
                <Button variant="light" onClick={handleClickDeselectAll} className='p-1'>Deselect all</Button>

            </ButtonGroup>

            <ButtonGroup className='w-40 '>
                <Button variant='warning' onClick={handleClickRewrite} className='p-1'>
                    {"Rewrite Items' Setting? "}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                    </svg>
                </Button>
                <Button variant='danger' onClick={handleClickDelete} className='p-1'>
                    {"Delete Items? "}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                    </svg>
                </Button>
            </ButtonGroup>

        </ButtonToolbar> */}


        {
            isRewrite ?
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
                : ""
        }


    </div>
    )
}

