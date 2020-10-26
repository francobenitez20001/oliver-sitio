import React from 'react';
import Head from 'next/head';
import {URL_CLOUD_STORAGE} from '../../config/index';
const Header = ({title}) => {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href={`${URL_CLOUD_STORAGE}/Perro.png`} />
        </Head>
    );
}
 
export default Header;