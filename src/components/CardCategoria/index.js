import React from 'react';
import slug from '../../../helpers/index';
import {URL_CLOUD_STORAGE} from '../../../config/index';
import Link from 'next/link';

const CardCategoria = ({categoria}) => {
    return (
        <div className="card__categoria text-center bg-white">
            <img src={`${URL_CLOUD_STORAGE}/icono-alimento.png`} alt="" className="mb-2 img-fluid"/>
            <h6 className="">{categoria.categoria}</h6>
            <Link href={`productos/${slug(`${categoria.categoria}`)}/${categoria.idCategoria}?type=categoria`}>
                <button className="boton bg-outline-yellow">Ver todos</button>
            </Link>
            <style jsx>{`
                .card__categoria{
                    padding: 30px 30px;
                    -webkit-box-shadow: 1px 2px 10px #f39512;
                }

                @media(max-width:768px){
                    .card__categoria{
                        margin: 0px 0px 15px 0px;
                    }
                }
            `}</style>
        </div>
    );
}
 
export default CardCategoria;