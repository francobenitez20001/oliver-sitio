import React from 'react';
const SliderFotosProducto = (props) => {

    const setImagenActive = (img,key,peso,precioUnidad,tamaño,idSubProducto,subProducto)=>{
        for (let index = 0; index < document.getElementsByClassName('img_small').length; index++) {
            document.getElementsByClassName('img_small')[index].classList.remove('active');
        };
        document.getElementsByClassName('img_small')[key].classList.add('active');
        document.querySelector('.img__box-grande').src = img;
        props.changePeso(key,`${peso}`,precioUnidad,`${tamaño}`,idSubProducto,`${subProducto}`)
    }
    return (
        <div className="row slider__fotos">
            <div className="col-12 col-md-4 text-center col__imagenes-chicas pt-5">
                {props.imagenes.map((img,key)=>(
                    (key==0)?<img key={key} src={img} onClick={()=>setImagenActive(img,key)} alt="prd" className="img_small active"/>:
                    <img key={key} src={img} onClick={()=>setImagenActive(img,key,`${props.subProductos[key].peso}`,props.subProductos[key].precioUnidad,`${props.subProductos[key].tamaño}`,props.subProductos[key].idSubProducto,`${props.subProductos[key].subProducto}`)} alt="prd" className="img_small"/>
                ))}
            </div>
            <div className="col-12 col-md-8 col__imagen-grande">
                <img src={props.imagenes[0]} alt="prd" className="img-fluid img__box-grande"/>
            </div>
            <style jsx>{`
                .slider__fotos .col__imagenes-chicas{
                    height: 429px;
                    overflow-y: auto;
                }

                .slider__fotos .col__imagenes-chicas::-webkit-scrollbar {
                    width: 5px;     /* Tamaño del scroll en vertical */
                    height:3px
                }

                    .slider__fotos .col__imagenes-chicas::-webkit-scrollbar-thumb {
                    background: #FFB347;
                    border-radius: 3px;
                }
                    .slider__fotos .col__imagenes-chicas::-webkit-scrollbar-thumb:hover {
                    background: #b3b3b3;
                    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
                }

                .slider__fotos .col__imagenes-chicas img{
                    height: 120px;
                    width: 90px !important;
                    cursor: pointer;
                }

                .slider__fotos .col__imagenes-chicas img:hover{
                    filter: brightness(70%);
                    transition: all .5s ease;
                }

                .slider__fotos .col__imagenes-chicas img.active{
                    border:2px solid #FFB347
                }

                @media(max-width:768px){
                    .slider__fotos{
                        flex-direction: column-reverse;
                    }
                    .slider__fotos .col__imagen-grande{
                        text-align: center;
                    }
                    .slider__fotos .col__imagen-grande img{
                        height: 345px;
                    }
                }
            `}</style>
        </div>
    );
}
 
export default SliderFotosProducto;