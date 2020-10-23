import React from 'react';
import CardProductoModule from  './CardProducto.module.css';
import Link from 'next/link';
import slug from '../../../helpers/index';
import {PUBLIC_URL} from '../../../config/index'

const CardProducto = ({imagen,prd}) => {
    return (
        <div className={CardProductoModule.container__producto + ' ' + `my-3`}>
            <section className={CardProductoModule.header__card}>
                <img src={`https://api.oliverpetshop.com.ar/img/`+imagen} alt="prd" className={CardProductoModule.img}/>
            </section>
            <section className={CardProductoModule.body__card}>
                {/*<span className={CardProductoModule.label__marca+ ' ' + `d-block text-muted`}>Marca</span>*/}
                <h6 className={CardProductoModule.nombre__producto+ ' ' + `text-muted`}>
                    {prd.subProducto}
                </h6>
                <span className={CardProductoModule.cantidad}>{prd.peso} KG</span>
                <h3 className={CardProductoModule.precio + ' ' + `text-black`}>${prd.precioUnidad}</h3>
            </section>
            <section className={CardProductoModule.footer__card}>
                <Link href={`${PUBLIC_URL}/producto/${slug(prd.subProducto)}/${prd.idSubProducto}`}>
                    <a className={CardProductoModule.btn_comprar + ' ' +`boton bg-blue`}>Comprar</a>
                </Link>
            </section>
            <span className={CardProductoModule.label__descuento+ ' ' + `bg-red`}>15% Off</span>
        </div>
        
    );
}
 
export default CardProducto;