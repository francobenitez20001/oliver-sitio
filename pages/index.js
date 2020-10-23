import {useEffect} from 'react';
import Header from '../src/components/Head';
import styles from '../styles/Home.module.css'
import SliderPublicidad from '../src/components/SliderPublicidad/index';
import { faLock,faCreditCard,faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Promociones from '../src/components/Promociones';
import BannerCategorias from '../src/components/BannerCategorias';
import BannerMarcas from '../src/components/BannerMarcas';
import FormContacto from '../src/components/FormContacto';
import Footer from '../src/components/Footer';
import Buscador from '../src/components/Buscador';
//import { scrollToTop } from '../../helpers/helpers';

const Home = () => {

    useEffect(() => {
        //scrollToTop()
    }, [])
    return (
        <>
            <Header title="Oliver PetShop"/>
            <SliderPublicidad img='./PublicidadProducto.jpg' img_dos='./envios.jpg' img_tres='./negocio.jpg'/>
            <section className={styles.info_deCompra}>
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-center">
                            <FontAwesomeIcon icon={faLock} className={`my-3` + ' ' + styles.iconHome}/>
                            <h5>Pagos Protegidos</h5>
                        </div>
                        <div className={`col-4 text-center` + ' ' + styles.borderXYellow}>
                            <FontAwesomeIcon icon={faCreditCard} className={`my-3` + ' ' + styles.iconHome}/>
                            <h5>Diversos medios de pago</h5>
                        </div>
                        <div className="col-4 text-center">
                            <FontAwesomeIcon icon={faThumbtack} className={`my-3` + ' ' + styles.iconHome}/>
                            <h5>Envíos en la zona de Pilar</h5>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <Promociones/>
            </div>
            <BannerCategorias/>
            <BannerMarcas/>
            <FormContacto/>
            <Footer/>
            <Buscador/>
        </>
    );
}
 
export default Home;