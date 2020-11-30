const FormModificarPw = () => {
    return (
        <form className="form-group" onSubmit={event=>event.preventDefault()}>
            <div className="col-12 mb-3">
                <label htmlFor="pw">Nueva Contraseña</label>
                <input type="password" className="form-control" placeholder="Ingrese su nueva contraseña" name="pw" id="pw"/>
            </div>
            <div className="col-12 mb-3">
                <label htmlFor="pw-repeat">Repita la nueva contraseña</label>
                <input type="password" className="form-control" placeholder="Repita su nueva contraseña" name="pw-repeat" id="pw-repeat"/>
            </div>
            <div className="col-12 text-center">
                <input type="submit" className="boton bg-yellow" value="Enviar"/>
            </div>
            <style jsx>{`
                form{
                    font-family: 'Quicksand', sans-serif!important;
                }
            `}</style>
        </form>
    );
}
 
export default FormModificarPw;