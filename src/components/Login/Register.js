import React,{useState} from 'react';
import PlacesAutocomplete,{geocodeByAddress,geocodeByPlaceId,getLatLng} from 'react-places-autocomplete';
import Error from "../Error";
import LoginStyle from './Login.module.css';
import { connect } from 'react-redux';
import * as usuarioActions from '../../../store/actions/usuarioActions';
import Loader from '../Loader';

const Register = (props) => {

    const [formRegisterValues, setFormRegisterValues] = useState({
        nombre:'',
        telefono:'',
        address:'',
        lat:'',
        lon:'',
        email:'',
        password:''
    });
    const [error, setError] = useState(false);

    const handleChangeLogin = event=>{
        setFormRegisterValues({
            ...formRegisterValues,
            [event.target.name]:event.target.value
        })
    };

    const handleSubmitLogin = event=>{
        event.preventDefault();
        if(formRegisterValues.nombre.trim()==='' || formRegisterValues.telefono.trim() === '' || 
        formRegisterValues.address.trim()==='' || formRegisterValues.lat === '' || formRegisterValues.lon === '' || formRegisterValues.email.trim()==='' || formRegisterValues.password.trim()===''){
            setError('Es necesario completar todos los campos');
            return false;
        }
        setError(false);
        return props.register(formRegisterValues);
    }

    const handleSelect = address => {
        geocodeByAddress(address).then(results => getLatLng(results[0])).then(latLng =>{
            setFormRegisterValues({
                ...formRegisterValues,
                address,
                lat:latLng.lat,
                lon:latLng.lng
            });
        })
        .catch(error => console.error('Error', error));
    };
    const handleChange = address => {
        setFormRegisterValues({
            ...formRegisterValues,
            address
        });
    };

    const habilitarLogin = ()=>{
        props.showLogin();
    }

    const redirigir = ()=>{
        setTimeout(() => {
            window.location.assign('/');
        }, 1500);
    }
    return (
        <div className={LoginStyle.login__container}>
            <h6 className={LoginStyle.title__login + ' ' + `text-center`}>Registrate</h6>
            {(props.error)?<Error message={props.error}/>:null}
            {(props.logueado)?<div className="alert alert-success text-center">Bienvenido/a {props.usuario.nombre} {redirigir()}</div>:
            <>
                <form className={LoginStyle.form + ' ' + `form-group`} name="form-login" id="form-login" onSubmit={handleSubmitLogin}>
                    <label className={LoginStyle.label} htmlFor="nombre">Nombre</label>
                    <input type="text"  className={LoginStyle.input + ' ' + `form-control`} id="nombre" name="nombre" value={formRegisterValues.nombre} onChange={handleChangeLogin}/>
                    
                    <label className={LoginStyle.label} htmlFor="telefono">Telefono</label>
                    <input type="number"  className={LoginStyle.input + ' ' + `form-control`} id="telefono" name="telefono" value={formRegisterValues.telefono} onChange={handleChangeLogin}/>
                    
                    <label className={LoginStyle.label} htmlFor="ubicacion">Ubicación</label>
                    <PlacesAutocomplete value={formRegisterValues.address} onChange={handleChange} onSelect={handleSelect}>
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                    className={LoginStyle.input + ' ' + `form-control`} id="ubicacion"
                                    {...getInputProps({
                                        placeholder: 'Buscá tu dirección ...',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
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
                    {/* <input type="text"  className={LoginStyle.input + ' ' + `form-control`} id="ubicacion" name="ubicacion" value={formRegisterValues.ubicacion} onChange={handleChangeLogin}/>
                    */}
                    <label className={LoginStyle.label} htmlFor="emal">Email</label>
                    <input type="email"  className={LoginStyle.input + ' ' + `form-control`} id="email" name="email" value={formRegisterValues.email} onChange={handleChangeLogin}/>
                    
                    <label className={LoginStyle.label} htmlFor="password">Contraseña</label>
                    <input type="password"  className={LoginStyle.input + ' ' + `form-control`} id="password" name="password" value={formRegisterValues.password} onChange={handleChangeLogin}/>
                    
                    <br/>
                    {(props.loading)?<div className="text-center"><Loader/></div>:<input type="submit" className="boton bg-yellow mb-1" value="Registrarme"/>}
                </form>
                <section className={LoginStyle.registerInLogin + ' ' + `text-center`}>
                    <span className="text-muted">¿Ya tenes cuenta?<span className={LoginStyle.registerLink} onClick={habilitarLogin}> Ingresá</span></span>
                </section>
            </>
            }
        </div>
    );
}
const mapStateToProps = reducers=>{
    return reducers.usuarioReducer;
}

export default connect(mapStateToProps,usuarioActions)(Register);