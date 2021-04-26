import React, { useState } from 'react';
import styles from './footer.module.css';
import {faFacebook,faInstagram} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {URL_CLOUD_STORAGE} from '../../../config';
import Modal from '../Modal/index';
import Instructivo from '../Instructivo';

const Footer = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const habilitarInstructivo = ()=>{
        setModalIsOpen(!modalIsOpen);
    }

    return (
        <>
            {modalIsOpen ? <Modal closeModal={habilitarInstructivo}>
                <Instructivo/>
            </Modal>:null}
            <div className={styles.container__subfooter + ' ' + `py-2`}>
                <div className={styles.containerImages + ` container`}>
                    <div className={styles.redes__footer}>
                        <FontAwesomeIcon onClick={()=>window.location.assign('https://www.facebook.com/Pet-shop-Oliver-1783777958556350')} icon={faFacebook} className={styles.iconos__footer}/>
                        <FontAwesomeIcon onClick={()=>window.location.assign('https://www.instagram.com/petshopoliver/')} icon={faInstagram} className={styles.iconos__footer}/>
                        <img src={`${URL_CLOUD_STORAGE}/static/mercadopago.png`} className="img-fluid" alt="mercado pago" width="35px"/>
                        <img src={`${URL_CLOUD_STORAGE}/static/comprasegura.jpeg`} className="img-fluid" alt="compra segura" width="65px"/>
                        <img src={`${URL_CLOUD_STORAGE}/static/afip.png`} className="img-fluid" alt="afip" width="45px"/>
                    </div>
                    <div className={styles.legales__footer}>
                        <ul className={styles.ul}>
                            <li className={styles.li}><a href="/politica">Terminos y condiciones</a></li>
                            <li className={styles.li}><a href="/politica">Políticas de privacidad</a></li>
                            <li style={{cursor:'pointer'}} onClick={habilitarInstructivo} className={styles.li}>¿Cómo comprar?</li>
                        </ul>
                    </div>
                </div>
            </div>
            <footer className="bg-yellow">
                <div className="container d-flex align-items-center justify-content-between py-2">
                    <span className="text-bold">Copyright &copy; {new Date().getFullYear()} oliverpetshop.com.ar. Todos los derechos reservados</span>
                    <img src={`${URL_CLOUD_STORAGE}/Perro.png`} alt="Oliver" width="50px" height="50px"/>
                </div>
            </footer>
        </>
    );
}
 
export default Footer;