import React from 'react';
import Head from '~/src/tsx/Head';
import MainBody from '~/src/tsx/MainBody'





export default function Supervisor() {
    return (
        <>
            <Head
                cssStyle={{ height: 'h-10', border: { position: 'border', addition: 'border-info border-1' } }}
            />
            <MainBody cssStyle={{ height: 'h-90', border: { position: 'border', addition: 'border-success border-1' } }} />
        </>
    )
}