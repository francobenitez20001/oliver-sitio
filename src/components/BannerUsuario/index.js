import AvatarUsuario from './avatar';
import EstadisticasUsuario from './estadisticas';

const BannerUsuario = (props) => {
    return (
        <section className="banner_usuario">
            <div className="row">
                <div className="col-12 col-md-6">
                    <AvatarUsuario abrirModalFoto={props.abrirModalFoto}/>
                </div>
                <div className="col-12 col-md-6">
                    <EstadisticasUsuario/>
                </div>
            </div>
            <style jsx>{`
                section{
                    height: 200px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                } 
                @media(max-width:768px){
                    section{
                        margin:50px 0px
                    }
                }   
            `}</style>
        </section>
    );
}
 
export default BannerUsuario;