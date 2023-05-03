import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


import Head from './tsx/Head';
import MainBody from './tsx/MainBody'



function clickEvent(){
    console.log("clicked");
}

const element = (
    <div className='h-100'>
        <Head/>
        <MainBody/>
    </div>
);
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(element);
