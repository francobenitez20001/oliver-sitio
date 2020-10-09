import React from 'react';
import './slider.css';
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
                    (key==0)?<img key={key} src={img.img} onClick={()=>setImagenActive(img.img,key)} alt="prd" className="img_small active"/>:
                    <img key={key} src={img.img} onClick={()=>setImagenActive(img.img,key)} alt="prd" className="img_small"/>
                ))}
            </div>
            <div className="col-12 col-md-8 col__imagen-grande">
                <img src={props.imagenes[0].img} alt="prd" className="img-fluid img__box-grande"/>
            </div>
        </div>
    );
}
 
export default SliderFotosProducto;