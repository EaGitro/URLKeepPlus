import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { CssStyle } from '~/src/tsTypes/styleTypes'

import objToClassname from '~/src/utilities/objToClassname';

type Props = {
    cssStyle: CssStyle;
}

export default function Head(props: Props) {
    return (

        <Navbar bg="dark" variant="dark" className={objToClassname(props.cssStyle)}>
            <Container>
                <Navbar.Brand href="#">
                    <img
                        alt=""
                        src="./icon/icon.png"
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                    />{' '}
                    URLKeep+
                </Navbar.Brand>
                <Navbar.Collapse className="me-auto justify-content-end">
                    <Navbar.Text>
                        <Nav.Link href="https://github.com/EaGitro/URLKeepPlus/blob/main/README.md">How To Use</Nav.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>



    )
}
