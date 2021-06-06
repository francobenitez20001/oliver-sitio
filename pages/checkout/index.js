import { useEffect, useState } from 'react';
import CardUbicacion from '../../src/components/CardUbicacion/index'; 
import OpcionesEnvio from '../../src/components/OpcionesEnvio';
import ZonaEnvio from '../../src/components/ZonaEnvio';
import Head from '../../src/components/Head';
import DetalleProductos from '../../src/components/DetalleProductos';
import Error from '../../src/components/Error';
import { connect } from 'react-redux';
import * as usuarioActions from '../../store/actions/usuarioActions';
import {API} from '../../config/index';
import Loader from '../../src/components/Loader/index';
import MediosDePago from '../../src/components/MediosDePago';
import Router from 'next/router';
import Modal from '../../src/components/Modal';
import FormVenta from '../../src/components/FormVenta';
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

    const handleClick = ()=>{
        const {usuario} = props.usuarioReducer;
        const {tipos:envio} = props.enviosReducer;
        const {zona} = props.zonasReducer;
        const {tipoEnvio,idZona,idMedioPago,total,subtotal,productos,porcentaje_descuento,descuento} = props.ventaReducer;

        if(!envio.local){
            if(!usuario.address || usuario.address==='') return setError('Es obligatorio completar tu ubicación.');
            if(!zona) return setError('En caso de no retirarlo por nuestro local, es obligatorio completar la zona de envío.');
        }
        setError(false);
        
        if(idMedioPago == '1'){
            habilitarModal();
            return;
        }
        setLoading(true);
        const {idUsuario} = usuario;
        let f = new Date();
        let mes = ((f.getMonth())<10)?`0${f.getMonth()+1}`:`${f.getMonth()}`;
        let dia = ((f.getDate())<10)?`0${f.getDate()}`:`${f.getDate()}`;
        let fecha = `${f.getFullYear()}-${mes}-${dia}`;
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
                fecha,
                operacion_id:null,
                idMedioPago
            }
        }
        return registrarVenta(dataToRequest);
    }
    
    const registrarVenta = async data=>{
        try {
            const headers = new Headers();
            headers.append('token',props.usuarioReducer.usuario.token);
            headers.append("Content-Type", "application/json");
            let url = `${API}/registrarVenta?mercadoPago=false`;
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
            {modalIsOpen ? <Modal closeModal={habilitarModal}><FormVenta/></Modal> : null}
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