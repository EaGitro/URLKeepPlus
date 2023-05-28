import React from 'react';


import { CssStyle } from '../../tsTypes/styleTypes'

import objToClassname from '~/src/utilities/objToClassname';
import parseDateTime from '~/src/utilities/parseDateTime';



import { useEffect } from 'react';
import { PanelType, DateKeyGroup } from '~/src/tsTypes/panelTypes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { StoragedData } from '~/src/tsTypes/propsTypes';




type Props = {
    cssStyle: CssStyle;
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

    // console.log("MainPanel props", props);
    // console.log("Mainpanel storagedData", props.storagedData);
    // window.windowMainpanelAltProps = props;

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
            // console.log("selectedSet has")
            selectedSet.delete(Number(e.target.value));
            props.selectedCheckBox.setState(selectedSet);
        } else {
            // console.log("selectedSet else")
            selectedSet.add(e.target.value);
            props.selectedCheckBox.setState(selectedSet);
        }
        // console.log("selectedSet", selectedSet);
    }


    // console.log(props.tabsInfo)

    let listItems = Object.keys(dataObjWithTheKey).map((objKey) => {

        // console.log(objKey, dataObjWithTheKey, dataObjWithTheKey[objKey]["title"])

        let url = objKey.split(" ")[2]

        return (
            <Container className='list-group-item list-group-item-action w-100' key={objKey}>
                <OverlayTrigger
                    placement='top'
                    overlay={<Tooltip id={`tooltip${objKey}`}>
                        {`Date: ${parseDateTime(objKey.split(" ")[0])},`}<br/>{`Keyword: "${dataObjWithTheKey[objKey].keyword}",`}<br/>{`Group: "${dataObjWithTheKey[objKey].group.join("/")}",`}<br/>{`\nNote: "${dataObjWithTheKey[objKey].note}"`}
                    </Tooltip>}>
                    <span>
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
                    </span>

                </OverlayTrigger>
            </Container>

        )


    })



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