import {Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
const TabsNav = (props) => {
    return (
        <Nav tabs>
            {props.solapas.map((solapa,key)=>(
                <NavItem key={key}>
                    <NavLink
                        className={classnames({ active: props.activeTab === `${key+1}`})}
                        onClick={() => { props.toggle(`${key+1}`); }}
                    >
                        {solapa.nombre}
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
    );
}
 
export default TabsNav;