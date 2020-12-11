import React from 'react';
const OpcionesEnvio = (props) => {
    return (
        <>
            <div className="containerCajaEnvio my-2" onClick={()=>props.cambiarTipoDeEnvio('normal')}>
                <input type="radio" name="envio" checked={props.tipoEnvio.normal}/>
                <div className="descripcion_ubicacion py-0 px-2">
                    <span className="d-block">Esperar el día correspondiente a mi zona</span>
                    <span className="text-muted direccionDetallada">Te llevamos tu pedido el día que hagamos envíos a la zona donde pertenece tu dirección.</span>
                </div>
            </div>
            <div className="containerCajaEnvio my-2" onClick={()=>props.cambiarTipoDeEnvio('express')}>
                <input type="radio" name="envio" checked={props.tipoEnvio.express}/>
                <div className="descripcion_ubicacion py-0 px-2">
                    <span className="d-block">Envío express</span>
                    <span className="text-muted direccionDetallada">Si lo queres lo antes posible, podemos enviartelo de manera express acordando un punto de entrega</span>
                </div>
                <span style={{color:'#3483fa',cursor:'pointer'}}></span>
            </div>
            <h2 className="mt-4">Opciones de retiro</h2>
            <div className="containerCajaEnvio my-2 local" onClick={()=>props.cambiarTipoDeEnvio('local')}>
                <input type="radio" name="envio" checked={props.tipoEnvio.local}/>
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
                    height:100px;
                    cursor:pointer;
                    font-family: 'Quicksand', sans-serif;
                }
                .containerCajaEnvio:hover{
                    -webkit-box-shadow: 1px 2px 7px #2e2e2e;
                    transition: all .3s ease;
                }
                @media(max-width:768px){
                    .direccionDetallada{
                        font-size:13px
                    }
                    .local{
                        margin-bottom:50px!important
                    }
                }

                @media(max-width:370px){
                    .direccionDetallada{
                        font-size:12px
                    }
                }
            `}</style>
        </>
    );
}
 
export default OpcionesEnvio;