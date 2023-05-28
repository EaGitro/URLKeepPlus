import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';

import Card from 'react-bootstrap/Card';
import SideCustomToggle from '~/src/tsx/MainBody/SideCustomToggle'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import { CssStyle } from '~/src/tsTypes/styleTypes';
import { PanelType, DateKeyGroup } from '~/src/tsTypes/panelTypes';
import { StoragedData } from '~/src/tsTypes/propsTypes';

import objToClassname from '~/src/utilities/objToClassname';
import parseDateTime from '~/src/utilities/parseDateTime';


type Props = {
    cssStyle: CssStyle;
    storagedData: StoragedData;
    setPanel: React.Dispatch<React.SetStateAction<PanelType>>
    setDateKeyGroup: React.Dispatch<React.SetStateAction<DateKeyGroup>>
}

export default function SideMenu(props: Props) {
    // let [isToggle01Opened, setIsToggle01] = useState(false);
    // let [isToggle02Opened, setIsToggle02] = useState(false);
    // let [isToggle03Opened, setIsToggle03] = useState(false);

    console.log("side menu props",props);


    /**
     * onclick func
     */

    function handleClickSelectDate(e: any) {
        console.log(e.target)
        console.log(e.target.innerHTML.replace(/[-: ]/g, ""))
        props.setDateKeyGroup(e.target.innerHTML.replace(/[-: ]/g, ""))
        props.setPanel('_all_')
    }

    function handleClickSelectCategory(e: any) {
        console.log("e.target",e.target.dataset["panelcategory"])
        props.setDateKeyGroup(e.target.innerHTML);
        props.setPanel(e.target.dataset["panelcategory"]);
    }

    function handleClickCurrent(){
        props.setPanel('_current_');
    }



    /**
     * saved date
     */

    let dateArr = Object.keys(props.storagedData.mainDataObj).map((x) => {

        console.log("x",x)
        let formattedDate = x.split(" ")[0]
        return parseDateTime(formattedDate)
    })

    let uniqueDateArr = [...new Set(dateArr)];

    console.log("uniqueDateArr",uniqueDateArr)



    let dateList = uniqueDateArr.map((x) => {
        return (
            <ListGroup.Item key={x}>
                <div className='text-decoration-underline' onClick={handleClickSelectDate}>{x}</div>
            </ListGroup.Item>
        )
    })

    /**
     * saved keywords
     */


    let keywordList = props.storagedData.keywordList.map((x) => {
        return (
            <ListGroup.Item key={x}>
                <div className='text-decoration-underline' data-panelcategory={'_keyword_'} onClick={handleClickSelectCategory}>{x}</div>
            </ListGroup.Item>
        )
    })

    /**
     * saved groups
     */

    let groupList = Object.keys(props.storagedData.groupObj).map((x) => {
        return (
            <ListGroup.Item key={x}>
                <div className='text-decoration-underline' data-panelcategory={'_group_'} onClick={handleClickSelectCategory}>{x}</div>
            </ListGroup.Item>
        )
    })

    return (

        <div className={objToClassname(props.cssStyle)}>
            {/* <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header className='d-flex justify-content-between h-100'>

                        <a>Dont click</a>

                        <SideCustomToggle eventKey="0" setToggle={setIsToggle01} isToggle={isToggle01Opened}> */}
            {/* {isToggle01Opened ? "\u{2227}" : "\u{2228}"} */}
            {/* <a className={(isToggle01Opened ? "arrow-top" : "arrow-bottom") + " arrow-black"}>  </a> */}
            {/* {isToggle01Opened ? "-" : "+"} */}
            {/* <Button variant={"dark"} className={"rounded-circle plus-minus"}>{isToggle01Opened ? ">" : "^"}</Button> */}

            {/* </SideCustomToggle>



                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <SideCustomToggle eventKey="1">Click me!</SideCustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion> */}

            <Card>
                <Card.Header className='py-4' onClick={handleClickCurrent}>
                    {"Current tabs"}
                </Card.Header>
            </Card>

            <Accordion className='w-100'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <a onClick={() => {
                            console.log("click")
                        }}>All Items</a>
                    </Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">
                            {dateList}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <a onClick={() => {
                            console.log("click")
                        }}>Keywords</a>
                    </Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">
                            {keywordList}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Groups</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">
                            {groupList}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </div>
    )
}