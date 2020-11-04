import React,{useState} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import InfoStyle from './infoProducto.module.css'
const InfoProducto = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const renderInfoNutricional = txt=>{
        if(!txt) return;
        if(txt.includes('<h3>')){
            let h3 = document.createElement('h4');
            let newTxt = txt.split('h3')[1];
            h3.append(newTxt);
            return txt.replace('<h3>   Valor Energético</h3>',h3);
        }
    }

    return (
        <>
            <section className={InfoStyle.detalles__producto}>
                <div className="container" >
                    <Nav tabs>
                        <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Descripción
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Información nutricional
                        </NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <div style={{backgroundColor:'white'}}>
                    <div className="container pt-3">
                        <TabContent activeTab={activeTab} className={InfoStyle.sub__container}>
                            <TabPane tabId="1">
                            <Row>
                                <Col sm="12" className={InfoStyle.p}>
                                    {props.descripcion_basica}
                                </Col>
                            </Row>
                            </TabPane>
                            <TabPane tabId="2">
                            <Row>
                                <Col sm="12" className={InfoStyle.p}>
                                    {renderInfoNutricional(props.descripcion)}
                                </Col>
                            </Row>
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            </section>
        </>
    );
}
 
export default InfoProducto;