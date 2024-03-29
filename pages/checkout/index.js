import { useEffect, useState } from 'react';
import CardUbicacion from '../../src/components/CardUbicacion/index'; 
import OpcionesEnvio from '../../src/components/OpcionesEnvio';
import ZonaEnvio from '../../src/components/ZonaEnvio';
import Head from '../../src/components/Head';
import DetalleProductos from '../../src/components/DetalleProductos';
import Error from '../../src/components/Error';
import { connect } from 'react-redux';
import * as usuarioActions from '../../store/actions/usuarioActions';
import {API,MP_AC_TOKEN,URL_PROCESAR_VENTA} from '../../config/index';
import Loader from '../../src/components/Loader/index';
import MediosDePago from '../../src/components/MediosDePago';
import Modal from '../../src/components/Modal';
//import Router from 'next/router';
//import FormVenta from '../../src/components/FormVenta';
const Swal = require('sweetalert2');

const {verificarSesion} = usuarioActions;

const Checkout = (props) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);//modal para mostrar el form de datos de tarjeta

    useEffect(() => {
        props.verificarSesion();
        document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
    }, []);

    //console.log(URL_PROCESAR_VENTA);

    const handleClick = ()=>{
        const {usuario} = props.usuarioReducer;
        const {tipos:envio} = props.enviosReducer;
        const {zona} = props.zonasReducer;
        const {tipoEnvio,idZona,idMedioPago,total,subtotal,productos,porcentaje_descuento,descuento,totalEnvio} = props.ventaReducer;

        if(!envio.local){
            if(!usuario.address || usuario.address==='') return setError('Es obligatorio completar tu ubicación.');
            if(!zona) return setError('En caso de no retirarlo por nuestro local, es obligatorio completar la zona de envío.');
        }
        setError(false);
        setLoading(true);
        const {idUsuario,token,nombre,email,telefono,address} = usuario;
        if(idMedioPago == '1'){
            //guardo data de envio para luego de hacer el checkout de mercado pago, envio los datos al servidor para registrar la venta con el envio correspondiente.
            localStorage.setItem('dataEnvio',JSON.stringify({tipo:tipoEnvio,zona:idZona}));
            let headers = new Headers();
            headers.append('Authorization',`Bearer ${MP_AC_TOKEN}`);
            headers.append("Content-Type", "application/json");
            let items = [];
            productos.map(prd=>{
                items.push({
                    id:prd.idSubProducto,
                    title:prd.subProducto,
                    currency_id:"ARS",
                    picture_url:prd.foto,
                    description:prd.producto + ' ('+ prd.tamaño + ')',
                    quantity:prd.cantidad,
                    unit_price:prd.precio
                })
            });
            let preference = {
                items,
                payer: {
                    name: nombre,
                    email: email,
                    phone: {
                        area_code: "11",
                        number: telefono
                    },
                    address: {
                        street_name: address
                    }
                },
                back_urls: {
                    success: URL_PROCESAR_VENTA,
                    failure: URL_PROCESAR_VENTA,
                    pending: URL_PROCESAR_VENTA
                },
                payment_methods: {
                    excluded_payment_types: [
                        { id: "ticket" }
                    ],
                    installments: 1
                },
                // notification_url: "https://hookb.in/7ZZKJPB89aFa99D3y3eo",
                statement_descriptor: "OLIVER_PETSHOP",
                external_reference: "",
                shipments:{
                    mode:"not_specified",
                    cost:totalEnvio,
                    receiver_address:{
                        street_name:address
                    }
                }
            }

            fetch('https://api.mercadopago.com/checkout/preferences',{
                method:'POST',
                headers,
                body:JSON.stringify(preference)
            }).then(res=>res.json()).then(data=>{
                window.location.assign(data.init_point);
            })
            return;
        }
        let dataToRequest = {
            envio:{
                idZona,
                tipo:tipoEnvio
            },
            venta:{
                subtotal,
                porcentaje_descuento,
                descuento,
                total,
                idUsuario,
                productos,
                idMedioPago
            }
        }
        return registrarVenta(dataToRequest,token);
    }

    const registrarVenta = async (data,token)=>{
        try {
            const headers = new Headers();
            headers.append('token',token);
            headers.append("Content-Type", "application/json");
            let url = `${API}/ventas/registrarVenta`;
            const reqVenta = await fetch(url,{
                headers,
                method:'POST',
                body:JSON.stringify(data)
            });
            if(reqVenta.status == 200){
                localStorage.removeItem('dataEnvio');
                localStorage.removeItem('carrito');
                Swal.fire(
                    'Listo',
                    'Su compra se ha registrado con éxito, solo resta que se dirija a nuestro local para hacerse con su producto.',
                    'success'
                ).then(()=>window.location.assign('/'));
            }else{
                setLoading(false);
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al momento de registrar la venta, intentalo más tarde',
                    'error'
                );
            }
        } catch (error) {
            setLoading(false);
            Swal.fire(
                'Error',
                'Ha ocurrido un error al momento de registrar la venta, intentalo más tarde',
                'error'
            );
            console.log(error.message);
        }
    }

    if(error){
        Swal.fire(
            'Atención',
            error,
            'warning'
        ).then(()=>setError(false))
    }

    const habilitarModal = ()=>{
        setModalIsOpen(!modalIsOpen);
    }

    return (
        (!props.usuarioReducer.logueado)?<div className="mt-3"><Error message="No puedes realizar una compra sin tener una sesión activa."/></div>:
        <>
            {(loading)?<div className="container-loader"><Loader/></div>:null}   
            <Head title="Oliver Pet Shop"/>
            <div className="container mb-4">
                <div className="row">
                    <div className="col-12 col-md-8 pt-4">
                        <h2>Últimos pasos para terminar tu compra</h2>
                        <CardUbicacion/>

                        <div className="alert alert-warning mt-3"><b>Atención:</b> Sí desea retirar su compra en nuestro local, no es necesario que seleccione una zona de envío</div>

                        <ZonaEnvio/>

                        <h2 className="mt-5">Opciones de envío</h2>
                        <OpcionesEnvio/>

                        <h2 className="mt-5">Selecciona un medio de pago</h2>
                        <MediosDePago/>

                        <button type="button" className="btn btn-primary" onClick={handleClick} id="btn-continuar">Continuar</button>
                        <div className="divTotalMobile">
                            <span id="total">${props.ventaReducer.total}</span>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Continuar</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 detalleProductos">
                        <DetalleProductos/>
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
            {modalIsOpen ? <Modal closeModal={habilitarModal}><FormVenta closeModal={habilitarModal}/></Modal> : null}
        </>
    );
}
 
const mapStateToProps = ({usuarioReducer,enviosReducer,ventaReducer,zonasReducer})=>{
    return {
        ventaReducer,
        usuarioReducer,
        enviosReducer,
        zonasReducer
    };
}

const mapDispatchToProps = {
    verificarSesion
};

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);