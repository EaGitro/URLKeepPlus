import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


import Head from './tsx/Head';
import MainBody from './tsx/MainBody'

// import {CssHeight} from '../tsTypes/styleTypes'

// About CSS style and types, see  ../tsTypes/styleTypes or ~/dist/style/

function clickEvent(){
    console.log("clicked");
}

const element = (
    <div className='h-100'>
        <Head cssStyle={{height: 'h-10'}} />
        <MainBody cssStyle={{height: 'h-90'}}/>
    </div>
);
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(element);




