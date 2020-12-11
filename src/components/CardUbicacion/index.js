import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
const CardUbicacion = () => {
    return (
        <div className="containerUbicacion">
            <span id="icon-ubicacion">
                <FontAwesomeIcon icon={faMapMarker}/>
            </span>
            <div className="descripcion_ubicacion py-0 px-2">
                <span className="d-block">Avenida Jardin 142</span>
                <span className="text-muted direccionDetallada">Entre: Aromo Y Cedro - - C.P. 6703 - Exaltación de la Cruz, Buenos Aires Franco Benitez - 01153887713</span>
            </div>
            <span style={{color:'#3483fa',cursor:'pointer'}}>Editar</span>

            <style jsx>{`
                .containerUbicacion{
                    display:flex;
                    padding:10px 20px;
                    background-color:#f5f5f5;
                    align-items:center
                }
                #icon-ubicacion{
                    width: 50px;
                    height:45px;
                    background-color: white;
                    border-radius: 25px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color:orange
                }
                @media(max-width:768px){
                    #icon-ubicacion{
                        width:45px
                    }
                    .direccionDetallada{
                        display:none;
                    }
                }
            `}</style>
        </div>
    );
}
 
export default CardUbicacion;
