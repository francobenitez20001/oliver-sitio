import Head from '../../src/components/Head';
import Loader from '../../src/components/Loader';
import {useRouter} from 'next/router';
import {connect} from 'react-redux';
import * as carritoActions from '../../store/actions/carritoActions';
import * as enviosActions from '../../store/actions/enviosActions';
import { useEffect, useState } from 'react';
import {API} from '../../config/index';
import Error from '../../src/components/Error';

const {guardar:enviosGuardar} = enviosActions;
const {traerProductos:carritoTraerProductos} = carritoActions;

const ProcesarVenta = (props) => {
    const [error, setError] = useState(false);
    const [ventaRegistrada, setVentaRegistrada] = useState(false);

    useEffect(() => {
        if(props.usuarioReducer.logueado){
            getData();
        }
    }, [props.usuarioReducer]);

    const getData = async()=>{
        const dataEnvio = JSON.parse(localStorage.getItem('dataEnvio'));
        props.enviosGuardar(dataEnvio);
        props.carritoTraerProductos();
        const {idUsuario} = props.usuarioReducer.usuario;
        const {subtotal,porcentaje_descuento,descuento,total,productos} = props.carritoReducer;
        const {zona,tipo} = dataEnvio;
        let f = new Date();
        let mes = ((f.getMonth())<10)?`0${f.getMonth()}`:`${f.getMonth()}`;
        let dia = ((f.getDay())<10)?`0${f.getDay()}`:`${f.getDay()}`;
        let fecha = `${f.getFullYear()}-${mes}-${dia}`;
        let dataToRequest = {
            envio:{
                idZona:zona,
                tipo
            },
            venta:{
                subtotal,
                porcentaje_descuento,
                descuento,
                total,
                idUsuario,
                productos,
                fecha
            }
        }
        return registrarVenta(dataToRequest);
    }

    const registrarVenta = async data=>{
        try {
            const headers = new Headers();
            headers.append('token',props.usuarioReducer.usuario.token);
            headers.append("Content-Type", "application/json");
            const reqVenta = await fetch(`${API}/registrarVenta`,{
                headers,
                method:'POST',
                body:JSON.stringify(data)
            });
            if(reqVenta.status == 200){
                localStorage.removeItem('dataEnvio');
                localStorage.removeItem('carrito');
                setVentaRegistrada('Felicidades, Tu venta se registró con éxito. En breve nos comunicaremos con ustedes para informarle el estado de su compra.');
            }else{
                setError(true);
            }
        } catch (error) {
            setError(error.message)
        }
    }

    console.log(props);
    const router = useRouter();
    return (
        <>
            <Head title="Finalizacion de compra" metadesc=""/>
            <div className="wrapper">
                {(!props.usuarioReducer.logueado || props.enviosReducer.error || props.carritoReducer.error || error)?<Error message="Ha ocurrido un error, intentalo mas tarde"/>:
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
    const {collection_id,collection_status,external_reference,merchant,account_id,merchant_order_id,payment_id,payment_type,preference_id,processing_mode,site_id,status} = query;
    return {collection_id,collection_status,external_reference,merchant,account_id,merchant_order_id,payment_id,payment_type,preference_id,processing_mode,site_id,status};
}

const mapStateToProps = ({carritoReducer,enviosReducer,usuarioReducer})=>{
    return {carritoReducer,enviosReducer,usuarioReducer}
};
const mapDispatchToProps = {
    enviosGuardar,
    carritoTraerProductos
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ProcesarVenta);