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
import BotonWhatsapp from '../src/components/BotonWhatsApp';
import {connect} from 'react-redux';
import * as productosActions from '../store/actions/productosActions';
const {restablecerFiltros} = productosActions;

const Home = (props) => {

    useEffect(() => {
        //scrollToTop()
        document.getElementsByTagName('body')[0].style.overflowY="auto";
        if(props.filtrando){
            props.restablecerFiltros();
        }
    }, [])
    return (
        <>
            <Header title="Oliver PetShop"/>
            <SliderPublicidad/>
            <section className={styles.info_deCompra + ''}>
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
                            <h5>Envíos en la zona de Pilar <br/> y aledaños</h5>
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
            <BotonWhatsapp/>
        </>
    );
}

const mapDispatchToProps = {
    restablecerFiltros
}

const mapStateToProps = ({productosReducer})=>productosReducer;
 
export default connect(mapStateToProps,mapDispatchToProps)(Home);