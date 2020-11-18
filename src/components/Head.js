import React from 'react';
import Head from 'next/head';
import {URL_CLOUD_STORAGE} from '../../config/index';
const Header = ({title}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="theme-color" content="#df8f0e"/>
            <link rel="icon" href={`${URL_CLOUD_STORAGE}/static/Perro.png`} />
            <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyDh6iZtfmNFUiGqEn6-7qENrzRKSIqh6qw"></script>
        </Head>
    );
}
 
export default Header;