import { faPencilAlt,faTimesCircle,faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import {connect} from 'react-redux';
import * as usuarioActions from '../../store/actions/usuarioActions';


const FormEditUsuario = (props) => {
    useEffect(() => {
        if(props.usuarioReducer.usuario){
            const {usuario} = props.usuarioReducer;
            setFormValues({
                nombre:usuario.nombre,
                telefono:'',
                email:usuario.email,
                address:usuario.address
            })
        }
    }, [props.usuarioReducer])

    const [formDisabled, setFormDisabled] = useState({
        nombre:true,
        telefono:true,
        email:true,
        address:true
    });

    const [formValues, setFormValues] = useState({
        nombre:'',
        telefono:'',
        email:'',
        address:''
    })

    const switchInput = nameInput=>{
        const estadoInput = formDisabled[nameInput];
        return setFormDisabled({
            ...formDisabled,
            [nameInput]:!estadoInput
        })
    }

    const handleChange = event=>{
        return setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    }

    return (
        <form className="form-group" onSubmit={event=>event.preventDefault()}>
            <div className="row">
                <div className="col-12 col-md-6 my-4 d-flex align-items-center">
                    <input disabled={formDisabled.nombre} onChange={handleChange} value={formValues.nombre} type="text" name="nombre" id="nombre" className="form-control mr-auto"/>
                    <FontAwesomeIcon className='iconoHabilitarInput' icon={(formDisabled.nombre)?faPencilAlt:faTimesCircle} onClick={()=>switchInput('nombre')}/>
                </div>
                <div className="col-12 col-md-6 my-4 d-flex align-items-center">
                    <input disabled={formDisabled.telefono} onChange={handleChange} value={formValues.telefono} type="number" name="telefono" id="telefono" className="form-control mr-auto"/>
                    <FontAwesomeIcon className='iconoHabilitarInput' icon={(formDisabled.telefono)?faPencilAlt:faTimesCircle} onClick={()=>switchInput('telefono')}/>
                </div>
                <div className="col-12 col-md-6 my-4 d-flex align-items-center">
                    <input disabled={formDisabled.email} onChange={handleChange} value={formValues.email} type="email" name="email" id="email" className="form-control mr-auto"/>
                </div>
                <div className="col-12 col-md-6 my-4 d-flex align-items-center">
                    <input disabled={formDisabled.address} onChange={handleChange} value={formValues.address} type="text" name="address" id="address" className="form-control mr-auto"/>
                    <FontAwesomeIcon className='iconoHabilitarInput' icon={(formDisabled.address)?faPencilAlt:faTimesCircle} onClick={()=>switchInput('address')}/>
                </div>
                <div className="col-12 mb-4 text-right">
                   <button type="button" className="btn btn-warning" onClick={props.abrirModalPw}>
                       <FontAwesomeIcon icon={faKey}/> Cambiar contraseña
                    </button> 
                </div>
                <div className="col-12 text-center">
                    <input type="submit" className="boton bg-yellow" value="Guardar cambios"/>
                </div>
            </div>
            <style jsx>{`
                .form-control{
                    width:92%
                }

                .iconoHabilitarInput{
                    cursor:pointer!important
                }
                button{
                    color:#fff !important
                }    
            `}</style>
        </form>
    );
}
const mapStateToProps = ({usuarioReducer})=>{
    return {usuarioReducer}
}
 
export default connect(mapStateToProps,usuarioActions)(FormEditUsuario);