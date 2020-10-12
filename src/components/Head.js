import React from 'react';
import Head from 'next/head';
const Header = ({title}) => {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/Perro.png" />
        </Head>
    );
}
 
export default Header;