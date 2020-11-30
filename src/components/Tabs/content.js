import { TabContent, TabPane,Row, Col } from 'reactstrap';
const TabsContent = (props) => {
    return (
        <TabContent activeTab={props.activeTab}>
            {props.solapas.map((solapa,key)=>(
                <TabPane tabId={`${key+1}`} key={key}>
                    <Row>
                        <Col sm="12" className=''>
                            asd
                        </Col>
                    </Row>
                </TabPane>
            ))}
        </TabContent>
    );
}
 
export default TabsContent;