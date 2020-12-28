import { faPencilAlt,faTimesCircle,faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect,useState } from "react";
import {connect} from 'react-redux';
import * as usuarioActions from '../../store/actions/usuarioActions';
import PlacesAutocomplete,{geocodeByAddress,getLatLng} from 'react-places-autocomplete';
import Loader from './Loader/';

const FormEditUsuario = (props) => {
    useEffect(() => {
        if(props.usuarioReducer.usuario && !props.usuarioReducer.loading){
            const {usuario} = props.usuarioReducer;
            setFormValues({
                nombre:usuario.nombre,
                telefono:usuario.telefono,
                email:usuario.email,
                address:usuario.address,
                lat:usuario.lat,
                lon:usuario.lon
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
        address:'',
        lat:0,
        lon:0
    })

    const [successAction, setSuccessAction] = useState('');

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
    const handleChangeUbicacion = address => setFormValues({...formValues,address});
    const handleSelectUbicacion = address => {
        geocodeByAddress(address).then(results => getLatLng(results[0])).then(latLng =>{
            setFormValues({
                ...formValues,
                address,
                lat:latLng.lat,
                lon:latLng.lng
            });
        })
        .catch(error => console.error('Error', error));
    };

    const handleSubmit = async event=>{
        event.preventDefault();
        await props.actualizarUsuario(formValues,props.usuarioReducer.usuario.idUsuario);
        if(!props.usuarioReducer.error && !props.usuarioReducer.loading){
            return setSuccessAction('Tus datos se han modificado de manera exitosa');
        }
        return setSuccessAction('');
    }

    return (
        <form className="form-group" onSubmit={handleSubmit}>
            {(successAction!='' && !props.usuarioReducer.error)?<div className="alert alert-success text-center"><b>{successAction}</b></div>:null}
            {(props.usuarioReducer.error)?<div className="alert alert-danger text-center"><b>{props.usuarioReducer.error}</b></div>:null}
            <div className="row">
                <div className="col-12 col-md-6 my-4 d-flex align-items-center">
                    <input disabled={formDisabled.nombre} onChange={handleChange} value={formValues.nombre} type="text" name="nombre" id="nombre" className="form-control mr-auto" placeholder="Nombre"/>
                    <FontAwesomeIcon className='iconoHabilitarInput' icon={(formDisabled.nombre)?faPencilAlt:faTimesCircle} onClick={()=>switchInput('nombre')} required/>
                </div>
                <div className="col-12 col-md-6 my-4 d-flex align-items-center">
                    <input disabled={formDisabled.telefono} onChange={handleChange} value={formValues.telefono} type="text" name="telefono" id="telefono" className="form-control mr-auto" placeholder="Telefono"/>
                    <FontAwesomeIcon className='iconoHabilitarInput' icon={(formDisabled.telefono)?faPencilAlt:faTimesCircle} onClick={()=>switchInput('telefono')}/>
                </div>
                <div className="col-12 col-md-6 my-4 d-flex align-items-center">
                    <input disabled={formDisabled.email} onChange={handleChange} value={formValues.email} type="email" name="email" id="email" className="form-control mr-auto"/>
                </div>
                <div className="col-12 col-md-6 my-4 d-flex align-items-center">
                    <PlacesAutocomplete value={formValues.address} onChange={handleChangeUbicacion} onSelect={handleSelectUbicacion}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div className="mr-auto w-100">
                            <input
                                className="form-control" name="address" id="address" 
                                {...getInputProps({
                                    placeholder:formValues.address
                                })}
                                disabled={formDisabled.address}
                                placeholder="Dirección"
                            />
                            <div className="autocomplete-dropdown-container" style={{position:'fixed',zIndex:'1000',backgroundColor:'#fff'}}>
                                {loading && <div>Cargando ubicaciones...</div>}
                                {suggestions.map((suggestion,key) => {
                                    const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer',margin:'10px',padding:'5px'}
                                    : { backgroundColor: '#ffffff', cursor: 'pointer',margin:'10px',padding:'5px'};
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                            key
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    </PlacesAutocomplete>
                    <FontAwesomeIcon className='iconoHabilitarInput' icon={(formDisabled.address)?faPencilAlt:faTimesCircle} onClick={()=>switchInput('address')}/>
                </div>
                <div className="col-12 mb-4 text-right">
                   <button type="button" className="btn btn-warning" onClick={props.abrirModalPw}>
                       <FontAwesomeIcon icon={faKey}/> Cambiar contraseña
                    </button> 
                </div>
                <div className="col-12 text-center">
                    {(props.usuarioReducer.loading)?
                        <Loader/>
                    :
                        <input type="submit" className="boton bg-yellow" value="Guardar cambios"/>
                    }
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