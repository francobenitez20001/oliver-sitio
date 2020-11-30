const AvatarUsuario = (props) => {
    return (
        <div className="row">
            <div className="col-12 col-md-6 text-center">
                <img src={`https://storage.googleapis.com/web-oliver/user-default.png`} alt={`user`}  className="img-fluid"/>
            </div>
            <div className="col-12 col-md-6 text-center">
                <h3>Franco Benitez</h3>
                <button type="button" onClick={props.abrirModalFoto} className="boton bg-yellow">Cambiar Foto</button>
            </div>
            <style jsx>{`
                img{
                    border-radius:50%;
                }
            `}</style>
        </div>
    );
}
 
export default AvatarUsuario;