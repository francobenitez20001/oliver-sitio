import Head from '../../src/components/Head'
import React, { useEffect } from 'react';
import BannerUsuario from '../../src/components/BannerUsuario';
import TabsNav from '../../src/components/Tabs/navs';
import FormEditUsuario from '../../src/components/FormEditUsuario';
import { TabContent, TabPane,Row, Col } from 'reactstrap';
import ProductosUsuario from '../../src/components/ProductosUsuario';
import Modal from '../../src/components/Modal/index';
import FormModificarFotoUsuario from '../../src/components/FormModificarFotoUsuario';
import FormModificarPw from '../../src/components/formModificarPw';
import Footer from '../../src/components/Footer/index';
import { connect } from "react-redux";
import * as productosActions from '../../store/actions/productosActions';
const {restablecerFiltros} = productosActions;

const Perfil = (props) => {
    const [activeTab, setActiveTab] = React.useState('1');
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [renderModalProfile, setRenderModalProfile] = React.useState(false);
    const [renderModalFormUsuario, setRenderModalFormUsuario] = React.useState(false);
    const [renderModalPw, setRenderModalPw] = React.useState(false);
    useEffect(() => {
        document.getElementsByTagName('body')[0].style.overflowY="auto";
        if(props.productosReducer.filtrando){
            props.restablecerFiltros()
        }
    }, [])

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const solapas = [
        {
            nombre:'Últimas compras'
        }
    ];

    const abrirModal = ()=>{
        setModalIsOpen(!modalIsOpen);
    }

    const abrirModalFoto = ()=>{
        setRenderModalProfile(true);
        setRenderModalPw(false);
        setRenderModalFormUsuario(false);
        abrirModal();
    }

    const abrirModalFormUsuario = () => {
        setRenderModalProfile(false);
        setRenderModalPw(false);
        setRenderModalFormUsuario(true);
        abrirModal();
    }

    const abrirModalPw = ()=>{
        setRenderModalPw(true);
        setRenderModalProfile(false);
        setRenderModalFormUsuario(false);
        abrirModal();
    }

    const renderContenidoModal = () => {
        if(renderModalProfile){
            return <FormModificarFotoUsuario/>
        }
        if(renderModalPw){
            return <FormModificarPw/>
        }
        if(renderModalFormUsuario){
            return <FormEditUsuario/>
        }
    }

    return (
        <>
            <Head title='Oliver Petshop - Mi perfil'/>
            <div className="container">
                <BannerUsuario abrirModalFoto={abrirModalFoto} abrirModalUsuario={abrirModalFormUsuario}/>
                <TabsNav toggle={toggle} activeTab={activeTab} solapas={solapas}/>
            </div>
            <div className="container-form">
                <div className="container pt-3">
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" className="tab-productos">
                            <Row>
                                <Col sm="12">
                                    <ProductosUsuario/>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
            {(modalIsOpen)?
            <Modal closeModal={abrirModal}>
                {renderContenidoModal()}
            </Modal>:null}
            <br/><br/>
            <Footer/>
            <style jsx>{`
                .container-form{
                    background-color:#fff;
                    height: auto;
                }
                @media(min-width:768px){
                    .container-form{
                        height:55vh;
                        display:flex;
                        align-items:center;
                        height: calc(100vh - 310px);
                    }
                }   
            `}</style>
        </>
    );
}
const mapStateToProps = (productosReducer)=>{
    return productosReducer
}

const mapDispatchToProps = {
    restablecerFiltros
}

export default connect(mapStateToProps,mapDispatchToProps)(Perfil);