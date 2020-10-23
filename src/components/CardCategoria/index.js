import React from 'react';
import Link from 'next/link';
import slug from '../../../helpers/index';

const CardCategoria = () => {
    return (
        <div className="card__categoria text-center bg-white">
            <img src='./icono-alimento.png' alt="" className="mb-2 img-fluid"/>
            <h6 className="">Alimento Balanceado</h6>
            <Link href={`productos/${slug('Alimento Balanceado')}/1?type=subcategoria`}>
                <a className="boton bg-outline-yellow">Ver todos</a>
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