import React from 'react';
import './infoProducto.css';
const InfoProducto = (props) => {
    const changePage = nameItem=>{
        let items = document.getElementsByClassName('itemMenuDetalleProducto');
        for (let index = 0; index < items.length; index++) {
            items[index].classList.remove('active');
        }
        for (let index = 0; index < document.getElementsByClassName('info_txt').length; index++) {
            document.getElementsByClassName('info_txt')[index].classList.add('d-none');
        }
        document.getElementsByName(nameItem)[0].classList.add('active');
        document.getElementById(nameItem).classList.remove('d-none');
    }
    return (
        <>
            <section className="detalles__producto">
                <header className="header__detalles__producto">
                    <div className="container">
                        <ul className="listaMenu__detalles__producto">
                            <li name="descripcion" onClick={()=>changePage('descripcion')} className="itemMenuDetalleProducto active">Descripcion</li>
                            <li name="info-nutricional" onClick={()=>changePage('info-nutricional')} className="itemMenuDetalleProducto ">Información nutricional</li>
                        </ul>
                    </div>
                </header>
            </section>
            <div className="container">
                <article className="sub__container info__detalle__producto">
                    <span id="descripcion" className="info_txt">
                        <p>Purina Pro Plan provee nutrición de avanzada que ayuda a los perros de razas pequeñas a mantenerse fuertes y llenos de vitalidad. A su vez, también ayuda a otras cosas claves en el cuidado de la mascota, tales como reforzar el sistema inmune, fortalecer la microflora intestinal y reforzar la barrera cutánea.Para satisfacer las necesidades nutricionales específicas de los perros de razas pequeñas, PRO PLAN® ha desarrollado OptiHealth Razas Pequeñas, una fórmula que ofrece nutrición concentrada con óptimos niveles de proteínas (29%) y grasas (17%).</p>
                    </span>
                    <span id="info-nutricional" className="d-none info_txt">
                        <h2>Ingredientes</h2>
                        <p>Carne de Pollo, Arroz, Harina de Subproductos de Pollo, Maíz, Harina de Gluten de Maíz, Grasa Vacuna y/o Aceite de Pollo Preservados con Tocoferoles Mezclados (Fuente de Vitamina E), Trigo, Digesto Animal (A Base de Subproductos de Pollo y/o Porcino), Carbonato de Calcio y/o Fosfato Bicalcico, Cloruro de Potasio, Huevo en Polvo, Sal, Aceite de Pescado, Cloruro de Colina, L-Lisina, Spirulina (Arthrospira platensis), Suplementos Vitamínicos (A, D3, E, B12), Dl-Metionina, Taurina, Levadura Seca (Saccharomyces cerevisiae ssp), Sulfato de Zinc, Proteinato de Zinc, Sulfato Ferroso, Sulfato de Manganeso, Proteinato de Manganeso, Sulfato de Cobre, Proteinato de Cobre, Iodato de Calcio, Selenito de Sodio, BHT, Niacina, Pantotenato de Calcio, Suplemento de Riboavina, Mononitrato de Tiamina, Ácido Fólico, Clorhidrato de Piridoxina.</p> 
                    </span>
                </article>
            </div>
        </>
    );
}
 
export default InfoProducto;