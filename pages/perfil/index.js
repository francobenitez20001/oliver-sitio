import Head from '../../src/components/Head'
import React from 'react';
import BannerUsuario from '../../src/components/BannerUsuario';
import TabsNav from '../../src/components/Tabs/navs';
import FormEditUsuario from '../../src/components/FormEditUsuario';
import { TabContent, TabPane,Row, Col } from 'reactstrap';
import ProductosUsuario from '../../src/components/ProductosUsuario';
import Modal from '../../src/components/Modal/index';
import FormModificarFotoUsuario from '../../src/components/FormModificarFotoUsuario';
import FormModificarPw from '../../src/components/formModificarPw';
const Perfil = () => {
    const [activeTab, setActiveTab] = React.useState('1');
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [renderModalProfile, setRenderModalProfile] = React.useState(false);
    const [renderModalPw, setRenderModalPw] = React.useState(false);

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const solapas = [
        {
            nombre:'General'
        },
        // {
        //     nombre:'Mis compras'
        // }
    ];

    const abrirModal = ()=>{
        setModalIsOpen(!modalIsOpen);
    }

    const abrirModalFoto = ()=>{
        setRenderModalProfile(true);
        setRenderModalPw(false);
        abrirModal();
    }

    const abrirModalPw = ()=>{
        setRenderModalPw(true);
        setRenderModalProfile(false);
        abrirModal();
    }

    return (
        <>
            <Head title='Oliver Petshop - Mi perfil'/>
            <div className="container">
                <BannerUsuario abrirModalFoto={abrirModalFoto}/>
                <TabsNav toggle={toggle} activeTab={activeTab} solapas={solapas}/>
            </div>
            <div className="container-form">
                <div className="container pt-3">
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <FormEditUsuario abrirModalPw={abrirModalPw}/>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2" className="tab-productos">
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
                {(renderModalProfile)?
                    <FormModificarFotoUsuario/>
                :
                    <FormModificarPw/>
                }
            </Modal>:null}
            <style jsx>{`
                .container-form{
                    background-color:#fff;
                }
                @media(min-width:768px){
                    .container-form{
                        height:55vh;
                        display:flex;
                        align-items:center
                    }
                }   
            `}</style>
        </>
    );
}
 
export default Perfil;