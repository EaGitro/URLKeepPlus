import React from 'react';

import { CssStyle } from '~/src/tsTypes/styleTypes'

import objToClassname from '~/src/utilities/objToClassname';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { StoragedData } from '~/src/tsTypes/propsTypes';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


type Props = {
    cssStyle: CssStyle;
    storagedData: StoragedData;
}

export default function SubPanel(props: Props) {
    console.log("subpanel prosps", props)
    let selectedKeyword: string = "";
    let selectedGroup: string = "";

    if (props.storagedData.groupList.length == 0) {
        console.log("null groups")
        props.storagedData.groupList = ["null"];
    }
    if (props.storagedData.keywordList.length == 0) {
        console.log("null keywords")
        props.storagedData.keywordList = ["null"];
    }
    console.log("savedGroupsItems arr", props.storagedData.groupList)
    console.log("savedKeywordsItems arr", props.storagedData.keywordList)

    let savedGroupsItems = props.storagedData.groupList;
    window.windowGroup = savedGroupsItems;
    console.log("savedGroupsItems", savedGroupsItems,["null"].map((x)=>{return 1}), [...savedGroupsItems].map((x)=>{return 1}))
    savedGroupsItems = savedGroupsItems.map((x) => {
        function itemOnclick() {
            selectedGroup = x;
        }

        return (
            <li className='list-group-item list-group-item-action panel-list-item' onClick={itemOnclick}>{x}</li>
        )
    })
    console.log("savedGroupsItems mapped", savedGroupsItems,)
    let savedKeywordsItems = props.storagedData.keywordList;
    console.log("savedKeywordsItems", savedKeywordsItems, savedKeywordsItems[0])
    savedKeywordsItems = savedKeywordsItems.map((x) => {
        function itemOnclick() {
            selectedKeyword = x;
        }

        return (
            <li className='list-group-item list-group-item-action panel-list-item' onClick={itemOnclick}>{x}</li>
        )
    })

    console.log("savedKeywordsItems mapped", savedKeywordsItems)


    return (
        <div className={objToClassname(props.cssStyle)}>
            <ButtonToolbar className='h-25 p-1'>
                <ButtonGroup className='me-1'>
                    <Button variant="dark">Select all unsaved</Button>
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
                            <input id='inputKeyword' placeholder="Keyword" value={selectedKeyword} ></input>

                        </div>
                        <div className='w-100 h-65 overflow-auto'>
                            <ul className='w-100 h-100 list-group list-group-flush'>
                                {/* {savedKeywordsItems} */}
                            </ul>
                        </div>
                    </Col>
                    <Col xs={4} className='h-100'>
                        <div className='w-100 h-30'>
                            <input id='inputGroup' placeholder="Group" value={selectedGroup} ></input>

                        </div>
                        <div className='w-100 h-65 overflow-auto'>
                            <ul className='w-100 h-100 list-group list-group-flush'>
                                {/* {savedGroupsItems} */}
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

