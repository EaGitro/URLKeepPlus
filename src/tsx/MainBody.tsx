import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SideMenu from './MainBody/SideMenu';
import MainPanel from './MainBody/MainPanel'
import SubPanel from './MainBody/SubPanel'

// import {CssHeight} from '../tsTypes/styleTypes'

import {CssHeight, CssStyle} from './../tsTypes/styleTypes'

import objToClassname from '~/src/utilities/objToClassname';


type Props = {
    cssStyle: CssStyle;
}


export default function MainBody(props: Props) {
    return (
        <div className={objToClassname(props.cssStyle)}>
            <Container fluid className='h-100'>
                <Row className='h-100'>
                    <Col xs={"3"}>
                        <SideMenu cssStyle={{border:{position:'border', addition:'border-danger border-1'}}}/>
                    </Col>
                    <Col xs={"9"}>
                        <MainPanel cssStyle={{height: 'h-85'}}/>
                        <SubPanel cssStyle={{height: 'h-15'}}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}