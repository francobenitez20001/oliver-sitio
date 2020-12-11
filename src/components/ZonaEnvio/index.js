import React from 'react';
const ZonaEnvio = () => {
    return (
        <div className="zona-envios pt-4">
            <div className="zonaDiaContainer">
                <span className="d-block" style={{fontWeight:'bold'}}>Zona de envíos de hoy:</span>
                <span id="zonaActiva">Pilar</span>
            </div>
            <div className="form-zona">
                <form className="form-group">
                    <label>Seleccione la zona que corresponde con su dirección</label>
                    <select className="form-control" name="zona">
                        <option value="">Seleccione una zona</option>
                        <option value="Pilar">Pilar</option>
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
                }

                #zonaActiva{
                    text-transform:uppercase;
                    font-size:25px
                }

                label,select{
                    font-family: 'Quicksand', sans-serif;
                }
                
                @media(max-width:768px){
                    .zona-envios{
                        display:block
                    }
                    .zonaDiaContainer{margin-bottom:10px}
                }
            `}</style>
        </div>
    );
}
 
export default ZonaEnvio;