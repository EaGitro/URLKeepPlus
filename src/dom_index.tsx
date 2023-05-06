import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Supervisor from '~/src/tsx/Supervisor';

// import {CssHeight} from '../tsTypes/styleTypes'

// About CSS style and types, see  ~/src/tsTypes/styleTypes or ~/dist/style/

function clickEvent() {
    console.log("clicked");
}

const element = (
    <div className='h-100'>
        <Supervisor/>
        {/* <Head
            cssStyle={{ height: 'h-10', border: { position: 'border', addition: 'border-info border-1' } }}
        />
        <MainBody cssStyle={{ height: 'h-90', border: { position: 'border', addition: 'border-success border-1' } }} /> */}
    </div>
);
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(element);




