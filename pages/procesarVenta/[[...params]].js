import Head from '../../src/components/Head';
import Loader from '../../src/components/Loader';
import {connect} from 'react-redux';
import * as carritoActions from '../../store/actions/carritoActions';
import * as enviosActions from '../../store/actions/enviosActions';
import { useEffect, useState } from 'react';
import {API} from '../../config/index';
import Error from '../../src/components/Error';
const Swal = require('sweetalert2');

const {guardar:enviosGuardar} = enviosActions;
const {traerProductos:carritoTraerProductos} = carritoActions;

const ProcesarVenta = (props) => {
    const [error, setError] = useState(false);
    const [ventaRegistrada, setVentaRegistrada] = useState(false);

    useEffect(() => {
        procesarInfo();
    }, [props.usuarioReducer]);
    
    const procesarInfo = async()=>{
        const dataEnvio = JSON.parse(localStorage.getItem('dataEnvio'));
        props.enviosGuardar(dataEnvio);
        props.carritoTraerProductos();
        if(props.usuarioReducer.logueado && props.carritoReducer.productos.length>0 && props.enviosReducer.data){
            const {idUsuario} = props.usuarioReducer.usuario;
            const {subtotal,porcentaje_descuento,descuento,total,productos,idMedioPago} = props.carritoReducer;
            const {zona,tipo} = props.enviosReducer.data;
            let f = new Date();
            let mes = ((f.getMonth())<10)?`0${f.getMonth()+1}`:`${f.getMonth()}`;
            let dia = ((f.getDate())<10)?`0${f.getDate()}`:`${f.getDate()}`;
            let fecha = `${f.getFullYear()}-${mes}-${dia}`;
            let dataToRequest = {
                envio:{
                    idZona:zona,
                    tipo:tipo
                },
                venta:{
                    subtotal,
                    porcentaje_descuento,
                    descuento,
                    total,
                    idUsuario,
                    productos,
                    fecha,
                    operacion_id:props.collection_id || null,
                    idMedioPago
                }
            }
            //console.log(dataToRequest);
            return registrarVenta(dataToRequest);
        }
    }

    const registrarVenta = async data=>{
        try {
            const headers = new Headers();
            headers.append('token',props.usuarioReducer.usuario.token);
            headers.append("Content-Type", "application/json");
            let url = (!data.venta.operacion_id)?`${API}/registrarVenta?mercadoPago=false`:`${API}/registrarVenta?mercadoPago=true`;
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
                    'Felicidades, tu compra se registró con éxito. En breve nos comunicaremos con usted para informarle el estado de su compra vía email.',
                    'success'
                ).then(()=>window.location.assign('/'));
            }else{
                setError(true);
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            <Head title="Finalizacion de compra" metadesc=""/>
            <div className="wrapper">
                {(props.enviosReducer.error || props.carritoReducer.error || error)?<Error message="Ha ocurrido un error, intentalo mas tarde"/>:
                    <>
                        {(ventaRegistrada)?<div className="alert alert-success">{ventaRegistrada}</div>:
                            <>
                                <Loader/>
                                <p>Su compra esta siento procesada, aguarde unos segundos...</p>
                            </>
                        }
                    </>
                }
            </div>

            <style jsx>{`
                .wrapper{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:90vh;
                    flex-direction:column;
                }    
            `}</style>
        </>
    );
}

ProcesarVenta.getInitialProps = async({query})=>{
    const {collection_id} = query;
    return {collection_id};
}

const mapStateToProps = ({carritoReducer,enviosReducer,usuarioReducer})=>{
    return {carritoReducer,enviosReducer,usuarioReducer}
};
const mapDispatchToProps = {
    enviosGuardar,
    carritoTraerProductos
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ProcesarVenta);