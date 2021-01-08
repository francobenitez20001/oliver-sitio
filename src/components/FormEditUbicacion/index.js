import { useState } from 'react';
import PlacesAutocomplete,{geocodeByAddress,geocodeByPlaceId,getLatLng} from 'react-places-autocomplete';
import {connect} from 'react-redux';
import * as usuarioActions from '../../../store/actions/usuarioActions';
import Loader from '../Loader/index';

const FormEditUbicacion = (props) => {
    const [formValues, setFormValues] = useState({
        address:'',
        lat:'',
        lon:''
    });

    const handleChange = address => setFormValues({...formValues,address});

    const handleSelect = address => {
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

    const handleSubmit =event=>{
        event.preventDefault();
        props.actualizarAddress(formValues,props.usuarioReducer.usuario.idUsuario);
    }
    const {loading,error,actionSuccess} = props.usuarioReducer;
    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <h4 className="my-3">{(props.update)?'Cambiar ubicación':'Agregar Ubicación'}</h4>
            {(props.update)?
                <span className="text-muted">Ubicación registrada: <b>{props.usuarioReducer.usuario.address}</b></span>
            :null
            }
            <hr/>
            <PlacesAutocomplete value={formValues.address} onChange={handleChange} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            className="form-control" id="ubicacion"
                            {...getInputProps({
                                placeholder: 'Ingresa la nueva dirección...',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Cargando ubicaciones...</div>}
                            {suggestions.map((suggestion,key) => {
                                const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer',margin:'10px',padding:'5px' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer',margin:'10px',padding:'5px' };
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
            {(loading)?<div className="text-center"><Loader/></div>:<input type="submit" className="boton bg-yellow mt-3" value="Guardar dirección"/>}

            <style jsx>{`
                input,span{font-family: 'Quicksand', sans-serif;}
            `}</style>
        </form>
    );
}

const mapStateToProps = ({usuarioReducer})=>{
    return {usuarioReducer}
}

export default connect(mapStateToProps,usuarioActions)(FormEditUbicacion);