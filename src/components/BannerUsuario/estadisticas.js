import { connect } from "react-redux";

const EstadisticasUsuario = (props) => {
    return (
        <div className="estadisticas_usuario">
            <div className="col-12 text-center">
                <h2>{props.compras}</h2>
                <span>Compras</span>
            </div>
            {/* <div className="col-6 text-center">
                <h2>0</h2>
                <span>Puntos</span>
            </div> */}
            <style jsx>{`
                .estadisticas_usuario{
                    background-color:#fff;
                    width:50%;
                    float:right;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px 20px;
                    border-radius: 5px;
                }
                h2,span{
                    font-weight:bold;
                    color:#FFB347;
                }

                @media(max-width:768px){
                    .estadisticas_usuario{
                        float:initial;
                        width:100%;
                        margin:10px 0px 0px 0px;
                    }
                }
            `}</style>
        </div>
    );
}

const mapStateToProps = ({usuarioReducer})=>usuarioReducer;

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(EstadisticasUsuario);