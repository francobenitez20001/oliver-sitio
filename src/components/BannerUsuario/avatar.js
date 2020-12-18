const AvatarUsuario = ({usuario,abrirModalFoto}) => {
    return (
        <div className="row">
            <div className="col-12 col-md-6 text-center">
                <img src={usuario.foto} alt={usuario.nombre}/>
            </div>
            <div className="col-12 col-md-6 text-center">
                <h3>{usuario.nombre}</h3>
                <button type="button" onClick={abrirModalFoto} className="boton bg-yellow">Cambiar Foto</button>
            </div>
            <style jsx>{`
                img{
                    border-radius:30px;
                    width:60px;
                    height:60px
                }
            `}</style>
        </div>
    );
}
 
export default AvatarUsuario;