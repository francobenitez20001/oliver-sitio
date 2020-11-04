import React from 'react';
import CardProductoModule from  './CardProducto.module.css';
import Link from 'next/link';
import {slug,isMobile} from '../../../helpers/index';
import {PUBLIC_URL} from '../../../config/index'

const CardProducto = ({imagen,prd}) => {
    const procesarNombre = nombre=>{
        let nombreProcesado = nombre;
        if(isMobile()){
            if(nombreProcesado.length>25){
                nombreProcesado = nombre.substring(0,22)+'...';
            }
        }else{
            if(nombreProcesado.length>45){
                nombreProcesado = nombre.substring(0,40)+'...';
            }
        }
        return nombreProcesado;
    }

    return (
        <Link href={`${PUBLIC_URL}/producto/${slug(prd.subProducto)}/${prd.idSubProducto}`}>
            <a>
                <div className={CardProductoModule.container__producto + ' ' + `my-3`}>
                    <section className={CardProductoModule.header__card}>
                        <img src={`https://api.oliverpetshop.com.ar/img/`+imagen} alt="prd" className={CardProductoModule.img}/>
                    </section>
                    <section className={CardProductoModule.body__card}>
                        <span className={CardProductoModule.label__marca+ ' ' + `d-block text-muted`}>Marca</span>
                        <h6 className={CardProductoModule.nombre__producto+ ' ' + `text-muted`}>
                            {procesarNombre(prd.subProducto)}
                        </h6>
                        <span className={CardProductoModule.cantidad}>{prd.peso} KG</span>
                        <h3 className={CardProductoModule.precio + ' ' + `text-black`}>${prd.precioUnidad}</h3>
                    </section>
                    
                    <span className={CardProductoModule.label__descuento+ ' ' + `bg-red`}>15% Off</span>
                </div>
            </a>
        </Link>
    );
}
 
export default CardProducto;