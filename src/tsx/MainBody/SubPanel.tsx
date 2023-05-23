import React from 'react';

import { useState } from 'react';

import objToClassname from '~/src/utilities/objToClassname';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import { StoragedData } from '~/src/tsTypes/propsTypes';
import { TabInfoObj } from '~/src/tsTypes/tabInfoTypes';
import { CssStyle } from '~/src/tsTypes/styleTypes'



type Props = {
    cssStyle: CssStyle;
    storagedData: StoragedData;
    setDataObjFunc: React.Dispatch<any>;
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


    // window.windowSubpanelProps = props;
    // console.log("windowSubpanelProps",windowSubpanelProps)
    console.log("subpanel prosps", props)
    // let selectedKeyword: string = "";
    // let selectedGroup: string = "";

    /**
     * make <li> list children of `savedKeywordsItems` and `savedGroupsItems`
     */


    let savedGroupsItems = props.storagedData.groupList;
    let savedKeywordsItems = props.storagedData.keywordList;

    if (savedKeywordsItems.length == 0) {
        console.log("null keywords")
        savedKeywordsItems = ["null"];
    }
    if (savedGroupsItems.length == 0) {
        console.log("null groups")
        savedGroupsItems = ["null"];
    }


    savedKeywordsItems = savedKeywordsItems.map((x) => {
        function itemOnclick() {
            console.log("savedKeywords clicked")
            setStateKeyword(x);
        }

        return (
            <li className='list-group-item list-group-item-action panel-list-item' key={x} onClick={itemOnclick}>{x}</li>
        )
    })

    console.log("savedKeywordsItems mapped", savedKeywordsItems)

    savedGroupsItems = savedGroupsItems.map((x) => {
        function itemOnclick() {
            console.log("savedGroups clicked");
            setStateGroup(x);

        }

        return (
            <li className='list-group-item list-group-item-action panel-list-item' key={x} onClick={itemOnclick}>{x}</li>
        )
    })
    // console.log("savedGroupsItems mapped", savedGroupsItems,)



    /**
     * hundle function of inputKeyword and inputGroup
     */


    function hundleChangeKeyword(e) {
        setStateKeyword(e.target.value)
    }
    function hundleChangeGroup(e) {
        setStateGroup(e.target.value)
    }






    /**
     * ======= SAVE BUTTON =========
     */


    /**
     * which box are selected
     */


    let stragedUrls = Object.keys(props.storagedData.mainDataObj).map((dateAndUrl) => {
        return dateAndUrl.split(" ")[1]
    })



    /**
     * chackbox select button hundle func
     */

    function hundleClickAllUnsaved() {

        let unsavedIds = props.tabsInfo.map((tabsInfoObj)=>{
            if(!(tabsInfoObj.url in stragedUrls)){
                
                return tabsInfoObj.id;
            }

        })
        console.log("unsavedIds", unsavedIds)
        props.selectedCheckBox.setState(unsavedIds)
    }



    return (
        <div className={objToClassname(props.cssStyle)}>
            <ButtonToolbar className='h-25 p-1'>
                <ButtonGroup className='me-1'>
                    <Button variant="dark" onClick={hundleClickAllUnsaved}>Select all unsaved</Button>
                    <Button variant="light">Sellect all</Button>
                    <Button variant="light">Deselect all</Button>
                </ButtonGroup>

                <ButtonGroup className='w-20 ms-5'>
                    <Button variant='primary'>SAVE</Button>
                </ButtonGroup>

            </ButtonToolbar>



            <Container className='h-75 pt-3'>
                <Row className='h-100'>
                    <Col xs={4} className='h-100'>
                        <div className='w-100 h-30'>
                            <input id='inputKeyword' placeholder="Keyword" value={stateKeywordInputtedVal} onChange={hundleChangeKeyword}></input>

                        </div>
                        <div className='w-100 h-65 overflow-auto'>
                            <ul className='w-100 h-100 list-group list-group-flush'>
                                {savedKeywordsItems}
                            </ul>
                        </div>
                    </Col>
                    <Col xs={4} className='h-100'>
                        <div className='w-100 h-30'>
                            <input id='inputGroup' placeholder="Group" value={stateGroupInputtedVal} onChange={hundleChangeGroup}></input>

                        </div>
                        <div className='w-100 h-65 overflow-auto'>
                            <ul className='w-100 h-100 list-group list-group-flush'>
                                {savedGroupsItems}
                            </ul>
                        </div>
                    </Col>
                    <Col xs={4} className='h-100'>
                        <div className='w-100 h-100'>
                            <textarea placeholder='note' className='h-90 w-80'></textarea>
                        </div>

                    </Col>
                </Row>
            </Container>

        </div>

    )
}

