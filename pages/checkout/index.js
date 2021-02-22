import { useEffect, useState } from 'react';
import CardUbicacion from '../../src/components/CardUbicacion/index'; 
import OpcionesEnvio from '../../src/components/OpcionesEnvio';
import ZonaEnvio from '../../src/components/ZonaEnvio';
import Head from '../../src/components/Head';
import DetalleProductos from '../../src/components/DetalleProductos';
import Error from '../../src/components/Error';
import { connect } from 'react-redux';
import * as carritoActions from '../../store/actions/carritoActions';
import * as usuarioActions from '../../store/actions/usuarioActions';
import {API} from '../../config/index';
import Loader from '../../src/components/Loader/index';
import MediosDePago from '../../src/components/MediosDePago';
import Router from 'next/router';

const {traerProductos:carritoTraerProductos,cambiarMedioDePago} = carritoActions;
const {verificarSesion} = usuarioActions;

const Checkout = (props) => {
    const [tipoEnvio, setTipoEnvio] = useState({
        normal:true,
        express:false,
        local:false
    });

    const [zonaEnvio, setZonaEnvio] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        props.carritoTraerProductos();
    }, []);

    const cambiarTipoDeEnvio = tipoDeEnvio=>{
        if(tipoDeEnvio==='normal'){
            document.getElementById('form-zona-envio').removeAttribute('disabled');
            document.getElementById('form-medios-pago').setAttribute('disabled','true');
            props.cambiarMedioDePago('1');
            return setTipoEnvio({
                normal:true,
                express:false,
                local:false
            })
        }
        if(tipoDeEnvio==='express'){
            document.getElementById('form-zona-envio').removeAttribute('disabled');
            document.getElementById('form-medios-pago').setAttribute('disabled','true');
            props.cambiarMedioDePago('1');
            return setTipoEnvio({
                normal:false,
                express:true,
                local:false
            })
        }
        document.getElementById('form-zona-envio').setAttribute('disabled','true');
        document.getElementById('form-medios-pago').removeAttribute('disabled');
        return setTipoEnvio({
            normal:false,
            express:false,
            local:true
        })
    }

    const insertarZonaDeEnvio = zona=>{
        setZonaEnvio(zona);
    }

    const handleClick = ()=>{
        if(!props.usuarioReducer.usuario.address || props.usuarioReducer.usuario.address==='') return setError('Es obligatorio completar tu ubicación.');
        if(props.carritoReducer.idMedioPago=='') return setError('Es obligatorio completar el medio de pago');

        if(!tipoEnvio.local){
            //si no selecciona retiro en el local, es obligatorio completar la zona de envío
            if(zonaEnvio==='') return setError('Es obligatorio completar la zona de envío.');
        }

        setLoading(true);
        setError(false);
        let tipoDeEnvioActivo;
        if(tipoEnvio.local){tipoDeEnvioActivo='Local'};
        if(tipoEnvio.normal){tipoDeEnvioActivo='Domicilio'}
        if(tipoEnvio.express){tipoDeEnvioActivo='Express'}
        let dataEnvio = {
            tipo:tipoDeEnvioActivo,
            zona:zonaEnvio
        }
        //guardo data de envio para luego de hacer el checkout de mercado pago, envio los datos al servidor para registrar la venta con el envio correspondiente.
        localStorage.setItem('dataEnvio',JSON.stringify(dataEnvio));

        const {token} = props.usuarioReducer.usuario;
        const {productos:productosCarrito} = props.carritoReducer;
        let productos = [];
        productosCarrito.forEach(prd => {
            productos.push({
                title:prd.subProducto,
                description:prd.tamaño,
                quantity:prd.cantidad,
                unit_price:prd.precioUnidad
            })
        });
        let headers = new Headers();
        headers.append('token',token);
        headers.append("Content-Type", "application/json");
        if(props.carritoReducer.idMedioPago == '1'){
            fetch(`${API}/mercadopago`,{
                method:'POST',
                headers,
                body:JSON.stringify(productos)
            }).then(res=>res.json()).then(datamp=>{
                const {response} = datamp.info;
                setLoading(false);
                window.location.assign(response.init_point);
            }).catch(err=>{
                console.log(err);
                setLoading(false);
                setError(err.message);
            })
        }else{
            Router.push('/procesarVenta')
        }
    }

    return (
        (!props.usuarioReducer.logueado)?<div className="mt-3"><Error message="No puedes realizar una compra sin tener una sesión activa."/></div>:
        <>
            {(props.carritoReducer.productos.length===0)?<div className="mt-3"><Error message="No hay productos para finalizar la compra."/></div>:
                <>
                    {(loading)?<div className="container-loader"><Loader/></div>:null}   
                    <Head title="Oliver Pet Shop"/>
                    <div className="container mb-4">
                        <div className="row">
                            <div className="col-12 col-md-8 pt-4">
                                <h2>Últimos pasos para terminar tu compra</h2>
                                {(error)?<Error message={error}/>:null}
                                <CardUbicacion dataUser={props.usuarioReducer.usuario}/>
                                <h2 className="mt-5">Opciones de envío</h2>
                                <OpcionesEnvio tipoEnvio={tipoEnvio} cambiarTipoDeEnvio={cambiarTipoDeEnvio}/>
                                <ZonaEnvio setZonaEnvio={insertarZonaDeEnvio}/>
                                <h2 className="mt-5">Selecciona un medio de pago</h2>
                                <MediosDePago/>
                                <button type="button" className="btn btn-primary" onClick={handleClick} id="btn-continuar">Continuar</button>
                                <div className="divTotalMobile">
                                    <span id="total">${props.carritoReducer.subtotal}</span>
                                    <button type="button" className="btn btn-primary" onClick={handleClick}>Continuar</button>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 detalleProductos">
                                <DetalleProductos data={props.carritoReducer}/>
                            </div>
                        </div>
                        <style jsx>{`
                            h2{font-size:25px}
                            button#btn-continuar{
                                float:right;
                                margin-top:20px
                            }
                            .divTotalMobile{display:none}
                            @media(max-width:768px){
                                #btn-continuar{display:none}
                                .divTotalMobile{
                                    display:flex;
                                    justify-content:space-between;
                                    position: fixed;
                                    left:0;
                                    right:0px;
                                    bottom: 0px;
                                    background-color: #f7f7f7;
                                    padding: 16px;
                                    box-shadow: 0 -2px 8px 2px rgba(0,0,0,.15);
                                    border-width: 0 1px 1px;
                                    font-family: 'Quicksand', sans-serif;
                                } 
                                .detalleProductos{
                                    display:none
                                }           
                            }
                        `}</style>
                    </div>
                </>
            }
        </>
    );
}
 
const mapStateToProps = ({carritoReducer,usuarioReducer})=>{
    return {
        carritoReducer,
        usuarioReducer
    };
}

const mapDispatchToProps = {
    carritoTraerProductos,
    verificarSesion,
    cambiarMedioDePago
};

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);