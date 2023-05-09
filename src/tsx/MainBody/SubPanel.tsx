import React from 'react';

import { CssStyle } from '~/src/tsTypes/styleTypes'

import objToClassname from '~/src/utilities/objToClassname';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


type Props = {
    cssStyle: CssStyle;
}

export default function SubPanel(props: Props) {
    return (
        <div className={objToClassname(props.cssStyle)}>

            <ButtonGroup aria-label="Basic example">
                <Button variant="primary">Select all unsaved</Button>
                <Button variant="light">Sellect all</Button>
                <Button variant="light">Deselect all</Button>
            </ButtonGroup>


            <Container>
                <Row>
                    <Col>

                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Container>

        </div>

    )
}

