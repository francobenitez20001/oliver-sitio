import { useEffect, useState } from 'react';
import CardUbicacion from '../../src/components/CardUbicacion/index'; 
import OpcionesEnvio from '../../src/components/OpcionesEnvio';
import ZonaEnvio from '../../src/components/ZonaEnvio';
import Head from '../../src/components/Head';
import DetalleProductos from '../../src/components/DetalleProductos';
import { connect } from 'react-redux';
import * as carritoActions from '../../store/actions/carritoActions';

const Checkout = (props) => {
    //console.log(props);
    const [tipoEnvio, setTipoEnvio] = useState({
        normal:true,
        express:false,
        local:false
    });

    useEffect(() => {
        props.traerProductos();
    }, []);

    const cambiarTipoDeEnvio = tipoDeEnvio=>{
        if(tipoDeEnvio==='normal'){
            return setTipoEnvio({
                normal:true,
                express:false,
                local:false
            })
        }
        if(tipoDeEnvio==='express'){
            return setTipoEnvio({
                normal:false,
                express:true,
                local:false
            })
        }
        return setTipoEnvio({
            normal:false,
            express:false,
            local:true
        })
    }

    return (
        <>
            <Head title="Oliver Pet Shop"/>
            <div className="container mb-4">
                <div className="row">
                    <div className="col-12 col-md-8 pt-4">
                        <h2>Últimos pasos para terminar tu compra</h2>
                        <CardUbicacion/>
                        <ZonaEnvio/>
                        <h2 className="mt-5">Opciones de envío</h2>
                        <OpcionesEnvio tipoEnvio={tipoEnvio} cambiarTipoDeEnvio={cambiarTipoDeEnvio}/>
                        <button type="button" className="btn btn-primary" id="btn-continuar">Continuar</button>
                        <div className="divTotalMobile">
                            <span id="total">${props.subtotal}</span>
                            <button type="button" className="btn btn-primary">Continuar</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 detalleProductos">
                        <DetalleProductos data={props}/>
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
    );
}
 
const mapStateToProps = reducers=>{
    return reducers.carritoReducer;
}
export default connect(mapStateToProps,carritoActions)(Checkout);