import React,{ useEffect,useState } from 'react';
import CardProductoModule from  './CardProducto.module.css';
import Link from 'next/link';
import {slug,isMobile} from '../../../helpers/index';
import {PUBLIC_URL} from '../../../config/index';
import Router from 'next/router';

const CardProducto = ({imagen,prd}) => {
    const [isProductoDetalle, setIsProductoDetalle] = useState(false);
    useEffect(() => {
        const {router} = Router;
        if(router.route == '/producto/[...producto]'){
            setIsProductoDetalle(true);
        }
    }, [])
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
        (!isProductoDetalle)?
        <Link href={`${PUBLIC_URL}/producto/${slug(prd.producto)}/${prd.idProducto}`}>
            <a>
                <div className={CardProductoModule.container__producto + ' ' + `my-3`}>
                    <section className={CardProductoModule.header__card}>
                        <img src={imagen} alt="prd" className={CardProductoModule.img}/>
                    </section>
                    <section className={CardProductoModule.body__card}>
                        <span className="d-block text-muted">{prd.marca}</span>
                        <h6 className={CardProductoModule.nombre__producto+ ' ' + `text-muted`}>
                            {procesarNombre(prd.producto)}
                        </h6>
                        {(prd.peso != null)?<span className={CardProductoModule.cantidad + ` d-none`}>{prd.peso} KG</span>:null}
                        <h3 className={CardProductoModule.precio + ' ' + `text-black`}>${prd.precioUnidad}</h3>
                    </section>
                    
                    {prd.descuento ? <span className={CardProductoModule.label__descuento+ ' ' + `bg-red`}>{prd.descuento}% Off</span> : null}
                </div>
            </a>
        </Link>
        :
        <a href={`${PUBLIC_URL}/producto/${slug(prd.producto)}/${prd.idProducto}`}>
            <div className={CardProductoModule.container__producto + ' ' + `my-3`}>
                <section className={CardProductoModule.header__card}>
                    <img src={imagen} alt="prd" className={CardProductoModule.img}/>
                </section>
                <section className={CardProductoModule.body__card}>
                    <span className={CardProductoModule.label__marca+ ' ' + `d-block text-muted`}>{prd.marca}</span>
                    <h6 className={CardProductoModule.nombre__producto+ ' ' + `text-muted`}>
                        {procesarNombre(prd.producto)}
                    </h6>
                    <span className={CardProductoModule.cantidad + ` d-none`}>{prd.peso} KG</span>
                    <h3 className={CardProductoModule.precio + ' ' + `text-black`}>${prd.precioUnidad}</h3>
                </section>
                
                <span className={CardProductoModule.label__descuento+ ' ' + `bg-red`}>15% Off</span>
            </div>
        </a>
    );
}
 
export default CardProducto;