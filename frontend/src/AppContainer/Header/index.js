import React from 'react';

import {Div, Img} from 'glamorous';
import {Link} from 'react-router-dom';
import {Dropdown, NavItem, Input} from 'react-materialize';

const Header = (props) => {

    return (
        <Div
            position="relative"
            className="teal"
        >
            <h3 className="white-text">Ambrosia</h3>
            { props.user != null ?
                (
                    <Dropdown trigger={
                        <Img className="circle"
                             position="absolute"
                             right="10px"
                             top="15px"
                             src={props.user.picture.data.url}/>
                    }>
                        <NavItem><Input name='group1' onChange={e => props.updatePreference('vegetarian', e)} type='checkbox' value='vegetarian' label='Vegetarian' /></NavItem>
                        <NavItem><Input name='group1' onChange={e => props.updatePreference('hypertensive', e)} type='checkbox' value='hypertensive' label='Hypertensive' /></NavItem>
                        <NavItem><Input name='group1' onChange={e => props.updatePreference('halal', e)} type='checkbox' value='halal' label='Halal Only' /></NavItem>
                        <NavItem><Input name='group1' onChange={e => props.updatePreference('budget', e)} type='checkbox' value='budget' label='Budget' /></NavItem>
                        <NavItem style={{
                            padding: '0',
                            lineHeight: '0',
                            minHeight: '0',
                            borderBottom: '2px solid #eeeeee',
                            height: '0px'
                        }}>&nbsp;</NavItem>
                        <NavItem><Link to="/cart"><i className="material-icons">shopping_cart</i> Cart</Link></NavItem>
                    </Dropdown>
                ) : (<span></span>) }

        </Div>
    );

};

export default Header;
