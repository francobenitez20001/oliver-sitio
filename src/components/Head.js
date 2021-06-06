import React from 'react';
import Head from 'next/head';
import {URL_CLOUD_STORAGE} from '../../config/index';
const Header = ({title,metadesc}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="theme-color" content="#df8f0e"/>
            <link rel="icon" href={`${URL_CLOUD_STORAGE}/static/Perro.png`} />
            {(metadesc)?
            <meta name="description" content={metadesc}/>:null}
            <script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
        </Head>
    );
}
 
export default Header;