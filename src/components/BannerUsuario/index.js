import AvatarUsuario from './avatar';
import EstadisticasUsuario from './estadisticas';
import {connect} from 'react-redux';
import * as usuarioActions from '../../../store/actions/usuarioActions';

const BannerUsuario = (props) => {
    const {usuario} = props.usuarioReducer;
    return (
        (usuario)?
        <section className="banner_usuario">
            <div className="row">
                <div className="col-12 col-md-6">
                    <AvatarUsuario usuario={usuario} abrirModalFoto={props.abrirModalFoto}/>
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
                        margin:50px 0px
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