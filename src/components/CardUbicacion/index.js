import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{ useState } from 'react';
import FormEditUbicacion from '../FormEditUbicacion';
import Modal from '../Modal/index';
import { connect } from "react-redux";


const CardUbicacion = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const switchModalEditUbicacion = ()=>{
        setModalIsOpen(!modalIsOpen);
    } 
    const{usuario} = props;
    let direccionAcortada;
    if(usuario.address){
        direccionAcortada = usuario.address.split(',')[0];
    }
    return (
        <div className="containerUbicacion">
            <span id="icon-ubicacion">
                <FontAwesomeIcon icon={faMapMarker}/>
            </span>
            <div className="descripcion_ubicacion py-0 px-2">
                {(usuario.address)?
                <>
                    <span className="d-block">{direccionAcortada}</span>
                    <span className="text-muted direccionDetallada">{usuario.address} {usuario.nombre} - {usuario.email}</span>
                </>:<span>Sin ubicaciones guardadas</span>
                }
            </div>
            {(usuario.address)?
                <span style={{color:'#3483fa',cursor:'pointer',marginLeft:'auto'}} onClick={switchModalEditUbicacion}>Editar</span>
            :
                <span style={{color:'#3483fa',cursor:'pointer',marginLeft:'auto'}} onClick={switchModalEditUbicacion}>Agregar</span>
            }

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
            {(modalIsOpen)?<Modal closeModal={switchModalEditUbicacion}>
                {(usuario.address)?
                    <FormEditUbicacion update={true}/>
                :
                    <FormEditUbicacion update={false}/>
                }
            </Modal>:null}
        </div>
    );
}

const mapStateToProps = ({usuarioReducer})=>usuarioReducer;

export default connect(mapStateToProps,{})(CardUbicacion);
