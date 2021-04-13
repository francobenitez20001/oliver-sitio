import React from 'react';
import { URL_CLOUD_STORAGE } from '../../../config';
const BotonWhatsapp = () => {
    
    const handleClick = ()=>{
        window.location.assign(`https://api.whatsapp.com/send?phone=+542304347008&text=Consulta desde pagina web`);
    }

    return (
        <div className="btn-wpp" onClick={handleClick}>
            <img src={`${URL_CLOUD_STORAGE}/assets/wpp.png`} className="img-fluid" alt="WhatsApp de Oliver PetShop"/>
        </div>
    );
}
 
export default BotonWhatsapp;