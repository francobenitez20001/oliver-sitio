import React from 'react';
const Instructivo = () => {
    return (
        <div className="container contenedor-instrucciones">
            <h4>Instrucciones para comprar</h4>
            <span className="text-muted">En primer lugar, es recomendable que estes con una sesión activa. Sí no iniciaste sesión, hacelo antes que todo.</span>

            <ol>
                <li>Seleccioná un producto clickeando sobre la imagen del mismo.</li>
                <li>Elije un peso en específico, cada producto tiene sus variantes.</li>
                <li>Si está seguro con el producto seleccionado y con su peso correspondiente, presione el botón <b>Comprar</b>, de esta forma se agregará el producto al carrito.</li>
                <span className="text-muted">En el caso de que quiera agregár más productos al carrito, repita las acciones <b>1,2 y 3</b></span>
                <li>Para iniciar el proceso final de la compra, presioná el botón del Carrito (Se encuentra en la parte superior derecha) y seleccionar la opción <b>Finalizar compra</b></li>
                <li>Elegir su <b>método</b> de envío, tené en cuenta que en el caso de que quieras retirarlo en el local, no es necesario que completes una <b>zona</b> de envío.</li>
                <li>Al Finalizar el paso anterior, en el caso de que haya optado por abonar con Mercado Pago, luego de completar con sus datos de pago, se hará un retorno a nuestra página para finalizar el registro de su compra. <b>Es importante que no abandone el sitio hasta no finalizar este paso.</b></li>
                <li>Finalmente si todo se realizó de manera óptima, te llegará un email a tu dirección de correo registrada con los datos de su compra.</li>
            </ol>
            <style jsx>{`
                h4{
                    border-bottom:2px solid #FFB347;
                    margin-bottom:15px;
                }
                span{
                    color:#FFB347 !important
                }    
                ol{
                    margin:20px 0px;
                }
                li{
                    margin:5px 0px;
                }
                li::marker{
                    color:#FFB347;
                    font-weight:bold
                }
                .contenedor-instrucciones{
                    height: 600px !important;
                    overflow-y: auto !important;
                }
                .contenedor-instrucciones::-webkit-scrollbar {
                    width: 5px;     /* Tamaño del scroll en vertical */
                }

                .contenedor-instrucciones::-webkit-scrollbar-thumb {
                    background: #FFB347;
                    border-radius: 4px;
                }
                .contenedor-instrucciones::-webkit-scrollbar-thumb:hover {
                    background: #b3b3b3;
                    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
                }
                @media(max-width:768px){
                    h4{
                        font-size:20px;
                    }
                    span{font-size:14px;}
                    ol{font-size:14px;}
                }

            `}</style>
        </div>
    );
}
 
export default Instructivo;