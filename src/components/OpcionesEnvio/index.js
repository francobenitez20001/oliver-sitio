import React from 'react';
import {connect} from 'react-redux';
import * as envioActions from '../../../store/actions/enviosActions';
import * as ventasActions from '../../../store/actions/ventasActions';
import * as zonasActions from '../../../store/actions/zonasActions';

const {guardar:guardarTipoDeEnvio} = envioActions;
const {setCostoEnvio:actualizarCostosDeEnvio} = ventasActions;
const {seleccionar:seleccionarZona} = zonasActions;

const OpcionesEnvio = (props) => {
    const {tipos:tipoEnvio} = props;
    
    const handleChange = tipoDeEnvio=>{
        switch (tipoDeEnvio) {
            case 'normal':
                document.getElementById('form-zona-envio').removeAttribute('disabled');
                document.getElementById('form-medios-pago').setAttribute('disabled','true');
                document.getElementById('form-medios-pago').value="1";
                break;
            case 'express':
                document.getElementById('form-zona-envio').removeAttribute('disabled');
                document.getElementById('form-medios-pago').setAttribute('disabled','true');
                document.getElementById('form-medios-pago').value="1";
                break;
            default:
                document.getElementById('form-zona-envio').setAttribute('disabled','true');
                document.getElementById('form-zona-envio').value="";
                document.getElementById('form-medios-pago').removeAttribute('disabled');    
                props.seleccionarZona(null);    
                break;
        }
        props.guardarTipoDeEnvio(tipoDeEnvio);

        props.actualizarCostosDeEnvio();
        return;
    }

    return (
        <>
            <div className="containerCajaEnvio my-2" onChange={()=>handleChange('normal')} onClick={()=>handleChange('normal')}>
                <input type="radio" name="envio" checked={tipoEnvio.normal}/>
                <div className="descripcion_ubicacion py-0 px-2">
                    <span className="d-block">Esperar el día correspondiente a mi zona</span>
                    <span className="text-muted direccionDetallada">Te llevamos tu pedido el día que hagamos envíos a la zona donde pertenece tu dirección.</span>
                </div>
            </div>
            <div className="containerCajaEnvio my-2" onClick={()=>handleChange('express')}>
                <input type="radio" name="envio" onChange={()=>handleChange('express')} checked={tipoEnvio.express}/>
                <div className="descripcion_ubicacion py-0 px-2">
                    <span className="limiteHorario">Hasta las <b>15hs</b></span>
                    <span className="d-block">Envío express</span>
                    <span className="text-muted direccionDetallada">Si lo queres lo antes posible, podemos enviartelo de manera express a tu domicilio. Si lo pedis antes de las 15 hs, te llegará en el día.</span>
                </div>
                <span style={{color:'#3483fa',cursor:'pointer'}}></span>
            </div>
            <h2 className="mt-4">Opciones de retiro</h2>
            <div className="containerCajaEnvio my-2 local" onClick={()=>handleChange('local')}>
                <input type="radio" name="envio" onChange={()=>handleChange('local')} checked={tipoEnvio.local}/>
                <div className="descripcion_ubicacion py-0 px-2">
                    <span className="d-block">Retiro en el local</span>
                    <span className="text-muted direccionDetallada">Retiralo en nuestro local cuando quieras totalmente <b>gratis</b></span>
                </div>
                <span style={{color:'#3483fa',cursor:'pointer'}}></span>
            </div>
            <style jsx>{`
                h2{font-size:25px}
                .containerCajaEnvio{
                    display:flex;
                    padding:10px 20px;
                    background-color:white;
                    align-items:center;
                    border-radius:10px;
                    height:120px;
                    cursor:pointer;
                    font-family: 'Quicksand', sans-serif;
                }
                .containerCajaEnvio:hover{
                    -webkit-box-shadow: 1px 2px 7px #2e2e2e;
                    transition: all .3s ease;
                }

                .containerCajaEnvio .limiteHorario{
                    font-size: 15px;
                    position: absolute;
                    color: #FFB347;
                    top: 54%;
                }
                @media(max-width:768px){
                    .containerCajaEnvio{
                        height:auto;
                    }
                    .direccionDetallada{
                        font-size:13px
                    }
                    .local{
                        margin-bottom:50px!important
                    }
                    .containerCajaEnvio .limiteHorario{
                        top: 59%;
                        right:50px
                    }
                }

                @media(max-width:370px){
                    .direccionDetallada{
                        font-size:12px
                    }
                    .containerCajaEnvio .limiteHorario{
                        top: 60%;
                        right:50px
                    }
                }
            `}</style>
        </>
    );
}

const mapDispatchToProps = {
    guardarTipoDeEnvio,
    actualizarCostosDeEnvio,
    seleccionarZona
}

const mapStateToProps = ({enviosReducer})=>enviosReducer;
 
export default connect(mapStateToProps,mapDispatchToProps)(OpcionesEnvio);