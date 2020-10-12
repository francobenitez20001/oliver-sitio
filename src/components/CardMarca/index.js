import React from 'react';
import styleMarca from './CardMarca.module.css';

const CardMarca = (props) => {
    return (
        <div className={styleMarca.card__marca + ' ' + `text-center bg-white`}>
            <img src={`https://api.oliverpetshop.com.ar/img/`+props.imagen} alt="" className={styleMarca.img + ' ' + `mb-2`}/>
        </div>
    );
}
 
export default CardMarca;