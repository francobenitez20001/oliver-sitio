const FormModificarFotoUsuario = () => {
    return (
        <form className="form-group" onSubmit={event=>event.preventDefault()}>
            <label>Seleccione la nueva imagen de perfil</label>
            <input type="file" className="form-control" name="foto"/>
            <input type="submit" className="boton bg-yellow mt-3" value="Subir"/>
        </form>
    );
}
 
export default FormModificarFotoUsuario;