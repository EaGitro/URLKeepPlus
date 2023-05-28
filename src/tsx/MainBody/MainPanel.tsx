import React from 'react';


import { CssStyle } from '../../tsTypes/styleTypes'

import objToClassname from '../../utilities/objToClassname';



import { TabInfoObj } from '~/src/tsTypes/tabInfoTypes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StoragedData } from '~/src/tsTypes/propsTypes';



type Props = {
    cssStyle: CssStyle;
    tabsInfo: TabInfoObj[];
    storagedData: StoragedData;
    setDataObjFunc: React.Dispatch<any>;
    selectedCheckBox: {
        state: Set<any>;
        setState: React.Dispatch<any>;
    }
}

// tmp();

export default function MainPanel(props: Props) {

    // console.log("MainPanel props", props);
    // console.log("Mainpanel storagedData", props.storagedData);
    // window.windowMainpanelProps = props;

 
    /**
     * generate storaged urls arr
     */


    let storagedUrls = Object.keys(props.storagedData.mainDataObj).map((dateAndUrl) => {
        // console.log("dateAndUrl",dateAndUrl);
        let shortenUrl =  dateAndUrl.split(" ")[2]
        
        let revertedurl = encodeURI(shortenUrl);
        return revertedurl
    })

    // console.log("storagedUrls",storagedUrls);
 

    /**
     * handle func for each checkbox
     */


    function handleChangeCheckBox(e){
        // let 
        
        let selectedSet = new Set(props.selectedCheckBox.state)
        if(selectedSet.has(Number(e.target.value))){
            // console.log("selectedSet has")
            selectedSet.delete(Number(e.target.value));
            props.selectedCheckBox.setState(selectedSet);
        }else{
            // console.log("selectedSet else")
            selectedSet.add(Number(e.target.value));
            props.selectedCheckBox.setState(selectedSet);
        }
        // console.log("selectedSet", selectedSet);
    }


    // console.log(props.tabsInfo)

    let listItems = props.tabsInfo.map((tabsInfoObj) => {


        return (
            <Container className='list-group-item list-group-item-action w-100' key={tabsInfoObj.id}>
                <Row className='flex-nowrap w-100 m-0 p-0 h-100' >
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
                            if (storagedUrls.includes(tabsInfoObj.url)) {
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
                        className={"h-100"}
                    >
                        <div className='breakword w-100 '>
                            <img src={tabsInfoObj.favIconUrl} className={"favicon"} />{" "}
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




    // console.log("MainPanel", props.tabsInfo)
    return (
        <div className={objToClassname(props.cssStyle)}>
            {/* MainPanel */}
            <div className={objToClassname({ width: 'w-100', height: 'h-100', list: { listGroup: 'list-group' }, margin: 'm-0', padding: 'p-0' })}>
                {listItems}
            </div>



        </div>
    )
}