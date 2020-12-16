import React from 'react';
import { useState,useEffect } from 'react';
import {API} from '../../../config/index';
import {ObtenerDia} from '../../../helpers/index';
const ZonaEnvio = (props) => {
    const [zonas, setZonas] = useState([]);
    const [zonaDelDia, setZonaDelDia] = useState('');
    useEffect(() => {
        getZonas();
    }, []);

    const getZonas = async()=>{
        try {
            const dataUser = JSON.parse(localStorage.getItem('oliverpetshop_usuario'));
            let myHeaders = new Headers();
            myHeaders.append("token", dataUser.token);
            const zonasApi = await fetch(`${API}zonas`,{headers:myHeaders});
            const dataZonas = await zonasApi.json();
            setZonas(dataZonas.data);
            verificarZonaDelDia(dataZonas.data);
        } catch (error) {
            alert(error);
        }
    }

    const handleChange = event=>{
        event.persist();
        props.setZonaEnvio(event.target.value);
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
                    <select className="form-control" name="zona" onChange={handleChange}>
                        <option value="">Seleccione una zona</option>
                        {zonas.map(zona=>(
                                <option key={zona.idZona} value={zona.zona}>{zona.zona} ({zona.dia})</option>
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
 
export default ZonaEnvio;