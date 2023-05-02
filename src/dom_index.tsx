import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


import Head from './dom/Head';
import MainBody from './dom/MainBody'



function clickEvent(){
    console.log("clicked");
}

const element = (
    <>
        <Head/>
        <MainBody/>
    </>
);
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(element);
