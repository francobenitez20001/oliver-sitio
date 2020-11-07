import React from 'react';
import {URL_CLOUD_STORAGE} from '../../../config/index'
const SliderFotosProducto = (props) => {

    const setImagenActive = (img,key)=>{
        for (let index = 0; index < document.getElementsByClassName('img_small').length; index++) {
            document.getElementsByClassName('img_small')[index].classList.remove('active');
        };
        document.getElementsByClassName('img_small')[key].classList.add('active');
        document.querySelector('.img__box-grande').src = img;
    }

    return (
        <div className="row slider__fotos">
            <div className="col-12 col-md-4 text-center col__imagenes-chicas pt-5">
                {props.imagenes.map((img,key)=>(
                    (key==0)?<img key={key} src={`${URL_CLOUD_STORAGE}/${img}`} onClick={()=>setImagenActive(img,key)} alt="prd" className="img_small active"/>:
                    <img key={key} src={`${URL_CLOUD_STORAGE}/${img}`} onClick={()=>setImagenActive(img,key)} alt="prd" className="img_small"/>
                ))}
            </div>
            <div className="col-12 col-md-8 col__imagen-grande">
                <img src={`${URL_CLOUD_STORAGE}/${props.imagenes[0]}`} alt="prd" className="img-fluid img__box-grande"/>
            </div>
            <style jsx>{`
                .slider__fotos .col__imagenes-chicas{
                    height: 429px;
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