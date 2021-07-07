import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FOTO_DEFAULT } from "../../../config";

const AvatarUsuario = ({usuario,abrirModalFoto,abrirModalUsuario}) => {
    return (
        <div className="row align-items-center">
            <div className="col-12 col-md-3 divFoto">
                <img src={usuario.foto ? usuario.foto : FOTO_DEFAULT} alt={usuario.nombre}/>
                <button type="button" className="boton bg-yellow btnEditarFoto" onClick={abrirModalFoto}><FontAwesomeIcon icon={faEdit}/></button>
            </div>
            <div className="col-12 col-md-9 d-flex align-items-center justify-content-between divInfo">
                <h3>{usuario.nombre}</h3>
                <button type="button" className="boton bg-outline-yellow boton-editar" onClick={abrirModalUsuario}>Editar</button>
            </div>
            <style jsx>{`
                .divFoto{
                    position: relative;
                }
                img{
                    border-radius:100%;
                    width:110px;
                    height:110px;
                    object-fit:cover;
                }
                .btnEditarFoto{
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 15px;
                    border-radius: 100%;
                    transition:all .5s ease;
                }

                .btnEditarFoto:hover{
                    width:37px;
                    height: 37px;
                }

                .boton-editar{
                    width:120px
                }
                @media(max-width:768px){
                    .divFoto{
                        text-align:center;
                    }

                    .btnEditarFoto{
                        left: 93px;
                        right: 0;
                        margin: auto;
                    }
                    .divInfo{
                        flex-direction:column;
                    }
                }
            `}</style>
        </div>
    );
}
 
export default AvatarUsuario;