import React from 'react';
import { useState,useEffect } from 'react';
import {ObtenerDia} from '../../../helpers/index';
import {connect} from 'react-redux';
import * as ventasActions from '../../../store/actions/ventasActions';
import * as zonaActions from '../../../store/actions/zonasActions';

const {traerTodas:traerZonas,seleccionar:seleccionarZona} = zonaActions;
const {setCostoEnvio} = ventasActions;

const ZonaEnvio = (props) => {
    const [zonaDelDia, setZonaDelDia] = useState('');
    const {zonas} = props.zonasReducer;

    useEffect(() => {
        props.traerZonas();
    }, []);

    useEffect(() => {
        if(zonas.length>0){
            verificarZonaDelDia(zonas);
        }
    }, [zonas])

    const handleChange = event=>{
        event.persist();
        props.seleccionarZona(event.target.value)
        
        //ejecutar funcion para modificar el state de ventasReducer con el monto del envio adecuado.
        props.setCostoEnvio();
    }

    const verificarZonaDelDia = (zonas)=>{
        let diaHoy = ObtenerDia(new Date().getDay());
        let zonasDeHoy = zonas.filter(res=>res.dia.includes(`${diaHoy}`));
        if(zonasDeHoy.length>0){
            if(zonasDeHoy.length==1){
                return setZonaDelDia(zonasDeHoy[0].zona);
            }
            let tempzonas = '';
            zonasDeHoy.map((zona,key)=>{
                if((key+1)==zonasDeHoy.length){
                    tempzonas += zona.zona;
                    return;
                };
                tempzonas += `${zona.zona} - `;
            })
            setZonaDelDia(tempzonas);
        }
    }

    return (
        <div className="zona-envios pt-4">
            <div className="zonaDiaContainer">
                <span className="d-block" style={{fontWeight:'bold'}}>Zona de envíos de hoy:</span>
                <span id="zonaActiva">{zonaDelDia}</span>
            </div>
            <div className="form-zona">
                <form className="form-group">
                    <label>Seleccione la zona que corresponde con su dirección</label>
                    <select className="form-control" name="zona" onChange={handleChange} id="form-zona-envio">
                        <option value="">Seleccione una zona</option>
                        {zonas.map(zona=>(
                                <option key={zona.idZona} value={zona.idZona}>{zona.zona} ({zona.dia})</option>
                            ))
                        }
                    </select>
                </form>
            </div>
            

            <style jsx>{`
                .zona-envios{
                    display:flex;
                    justify-content:space-between;
                    align-items:center
                }

                .zonaDiaContainer{
                    text-align:center;
                    padding: 5px 10px;
                    background-color: #2e9231;
                    color: white;
                    border-radius: 5px;
                    font-family: 'Quicksand', sans-serif;
                    width:44%;
                }

                #zonaActiva{
                    text-transform:uppercase;
                    font-size:18px
                }

                label,select{
                    font-family: 'Quicksand', sans-serif;
                }
                
                @media(max-width:768px){
                    .zona-envios{
                        display:block
                    }
                    .zonaDiaContainer{margin-bottom:10px;width:100%}
                }
            `}</style>
        </div>
    );
}

const mapStateToProps = ({carritoReducer,zonasReducer})=>{
    return {
        carritoReducer,
        zonasReducer
    }
};

const mapDispatchToProps = {
    traerZonas,
    seleccionarZona,
    setCostoEnvio
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ZonaEnvio);