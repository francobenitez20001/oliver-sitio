import {connect} from 'react-redux';
import Error from './Error';
import Loader from './Loader/index';
import * as usuarioActions from '../../store/actions/usuarioActions';

const FormModificarFotoUsuario = (props) => {
    const {usuario,error,loading} = props.usuarioReducer;
    
    const handleSubmit = event=>{
        event.preventDefault();
        let form = document.getElementById('formModificarFotoUsuario');
        let data = new FormData(form);
        if(data.get('foto').name==='') return;
        props.actualizarFoto(data,usuario.idUsuario);
    }
    return (
        <form className="form-group" id="formModificarFotoUsuario" onSubmit={handleSubmit}>
            {(error)?<Error message={error.message}/>:null}
            <label>Seleccione la nueva imagen de perfil</label>
            <input type="file" required className="form-control" name="foto"/>
            {(loading)?
                <div className="text-center mt-2"><Loader/></div>
            :
                <input type="submit" className="boton bg-yellow mt-3" value="Subir"/>
            }
        </form>
    );
}

const mapStateToProps = ({usuarioReducer})=>{
    return {usuarioReducer};
}

export default connect(mapStateToProps,usuarioActions)(FormModificarFotoUsuario);