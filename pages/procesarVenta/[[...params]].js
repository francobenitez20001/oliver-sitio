import Head from '../../src/components/Head';
import Loader from '../../src/components/Loader';
import {connect} from 'react-redux';
import * as carritoActions from '../../store/actions/carritoActions';
import * as enviosActions from '../../store/actions/enviosActions';
import * as zonasActions from '../../store/actions/zonasActions';
import * as ventasActions from '../../store/actions/ventasActions';
import { useEffect, useState } from 'react';
import {API} from '../../config/index';
import Error from '../../src/components/Error';
const Swal = require('sweetalert2');

const {traerProductos:carritoTraerProductos} = carritoActions;
const {guardar:enviosGuardar} = enviosActions;
const {seleccionar:zonasGuardar,traerTodas:traerZonas} = zonasActions;
const {init:inicializarStoreVenta,setCostoEnvio:setDataEnvioEnVenta} = ventasActions;

const ProcesarVenta = (props) => {
    const [error, setError] = useState(false);
    const {carritoReducer,ventaReducer,carritoTraerProductos,enviosGuardar,zonasGuardar,inicializarStoreVenta,setDataEnvioEnVenta,traerZonas,payment_id,status,collection_id} = props;
    const {usuario,logueado} = props.usuarioReducer;
    const {zonas,zona} = props.zonasReducer;
    const {idMedioPago,tipoEnvio,productos,cantidad,subtotal,porcentaje_descuento,descuento,total} = props.ventaReducer;

    useEffect(() => {
        if(status == 'approved'){
            return traerZonas();
        }
        setError(true);
    }, [])

    useEffect(() => {
        if(logueado && zonas.length>0){
            const dataEnvio = JSON.parse(localStorage.getItem('dataEnvio'));
            enviosGuardar(dataEnvio.tipo);
            zonasGuardar(dataEnvio.zona);
            carritoTraerProductos();
        }
    }, [logueado,zonas]);

    useEffect(() => {
        if(carritoReducer.productos.length>0){
            inicializarStoreVenta();
            setDataEnvioEnVenta();
        }
    }, [carritoReducer.productos]);

    useEffect(() => {
        if(!tipoEnvio || !productos.length || cantidad==0 || total == 0 ){
            console.log('no se puede completar la operacion');
            return;
        }
        const {idUsuario} = usuario;
        let dataToRequest = {
            envio:{
                idZona:zona.idZona,
                tipo:tipoEnvio
            },
            venta:{
                subtotal,
                porcentaje_descuento,
                descuento,
                total,
                productos,
                collection_id,
                payment_id,
                idMedioPago,
                idUsuario
            }
        }
        //console.log(dataToRequest);
        registrarVenta(dataToRequest);
    }, [ventaReducer])
    
    const registrarVenta = async data=>{
        try {
            const headers = new Headers();
            headers.append('token',usuario.token);
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
        error ? <Error message="Ha ocurrido un error, intentalo mas tarde"/>:
        <>
            <Head title="Finalizacion de compra" metadesc=""/>
            <div className="wrapper">
                <Loader/>
                <p>Su compra esta siento procesada, aguarde unos segundos...</p>
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
    const {collection_id,payment_id,status} = query;
    return {collection_id,payment_id,status};
}

const mapStateToProps = ({carritoReducer,enviosReducer,usuarioReducer,zonasReducer,ventaReducer})=>{
    return {carritoReducer,enviosReducer,usuarioReducer,zonasReducer,ventaReducer}
};
const mapDispatchToProps = {
    enviosGuardar,
    carritoTraerProductos,
    zonasGuardar,
    setDataEnvioEnVenta,
    inicializarStoreVenta,
    traerZonas
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ProcesarVenta);