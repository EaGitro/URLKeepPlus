import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SideMenu from './MainBody/SideMenu';
import MainPanel from './MainBody/MainPanel'
import SubPanel from './MainBody/SubPanel'


export default function MainBody() {
    return (
        <div className='h-90'>
            <Container fluid>
                <Row>
                    <Col xs={"3"}>
                        <SideMenu></SideMenu>
                    </Col>
                    <Col xs={"9"}>
                        <MainPanel></MainPanel>
                        <SubPanel></SubPanel>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}