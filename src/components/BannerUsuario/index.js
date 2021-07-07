import AvatarUsuario from './avatar';
import EstadisticasUsuario from './estadisticas';
import {connect} from 'react-redux';
import * as usuarioActions from '../../../store/actions/usuarioActions';

const BannerUsuario = (props) => {
    const {usuario} = props.usuarioReducer;
    return (
        (usuario)?
        <section className="banner_usuario">
            <h3>Mi perfil</h3>
            <div className="row align-items-center my-2">
                <div className="col-12 col-md-6">
                    <AvatarUsuario usuario={usuario} abrirModalFoto={props.abrirModalFoto} abrirModalUsuario={props.abrirModalUsuario}/>
                </div>
                <div className="col-12 col-md-6">
                    <EstadisticasUsuario/>
                </div>
            </div>
            <style jsx>{`
                section{
                    height: 200px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                } 
                @media(max-width:768px){
                    section{
                        margin:80px 0px 100px 0px;
                        padding: 30px 0px 0px 0px;
                    }
                }   
            `}</style>
        </section>
        :null
    );
}

const mapStateToProps = ({usuarioReducer})=>{
    return {usuarioReducer}
}
 
export default connect(mapStateToProps,usuarioActions)(BannerUsuario);