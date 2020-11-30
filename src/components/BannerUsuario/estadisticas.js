const EstadisticasUsuario = () => {
    return (
        <div className="estadisticas_usuario">
            <div className="col-6 text-center">
                <h2>0</h2>
                <span>Compras</span>
            </div>
            <div className="col-6 text-center">
                <h2>0</h2>
                <span>Puntos</span>
            </div>
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
                h2{
                    font-weight:bold
                }

                @media(max-width:768px){
                    .estadisticas_usuario{
                        float:initial;
                        width:100%;
                        margin-top:10px;
                    }
                }
            `}</style>
        </div>
    );
}
 
export default EstadisticasUsuario;