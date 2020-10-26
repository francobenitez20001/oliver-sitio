import React from 'react';
import styles from './footer.module.css';
import {faFacebook,faInstagram} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {URL_CLOUD_STORAGE} from '../../../config';
const Footer = () => {
    return (
        <>
            <div className={styles.container__subfooter + ' ' + `py-2`}>
                <div className="container d-flex">
                    <div className={styles.redes__footer}>
                        <FontAwesomeIcon icon={faFacebook} className={styles.iconos__footer}/>
                        <FontAwesomeIcon icon={faInstagram} className={styles.iconos__footer}/>
                        <img src={`${URL_CLOUD_STORAGE}/mercadopago.png`} className="img-fluid" alt="mercado pago" width="35px"/>
                        <img src={`${URL_CLOUD_STORAGE}/comprasegura.jpeg`} className="img-fluid" alt="compra segura" width="65px"/>
                        <img src={`${URL_CLOUD_STORAGE}/afip.png`} className="img-fluid" alt="afip" width="45px"/>
                    </div>
                    <div className={styles.legales__footer}>
                        <ul>
                            <li><a href="/">Terminos y condiciones</a></li>
                            <li><a href="/">Políticas de privacidad</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <footer className="bg-yellow">
                <div className="container d-flex align-items-center justify-content-between py-2">
                    <span className="text-bold">Copyright &copy; 2020 oliverpetshop.com.ar. Todos los derechos reservados</span>
                    <img src={`${URL_CLOUD_STORAGE}/Perro.png`} alt="Oliver" width="50px" height="50px"/>
                </div>
            </footer>
        </>
    );
}
 
export default Footer;