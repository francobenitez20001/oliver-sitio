import { useState } from 'react';
import PlacesAutocomplete,{geocodeByAddress,geocodeByPlaceId,getLatLng} from 'react-places-autocomplete';

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
        console.log(formValues);
    }

    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <h4 className="my-3">{(props.update)?'Cambiar ubicación':'Agregar Ubicación'}</h4>
            {(props.update)?
                <span className="text-muted">Ubicación registrada: <b>Avenida Jardin 142, Exaltación de la Cruz, Buenos Aires</b></span>
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
            <input type="submit" className="boton bg-yellow mt-3" value="Guardar dirección"/>

            <style jsx>{`
                input,span{font-family: 'Quicksand', sans-serif;}
            `}</style>
        </form>
    );
}
 
export default FormEditUbicacion;