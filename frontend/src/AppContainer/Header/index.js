import React from 'react';

import {Div, Img} from 'glamorous';

import {Dropdown, NavItem, Input} from 'react-materialize';

const Header = (props) => {

    return (
        <Div
            position="relative"
            className="teal"
        >
            <h3 className="white-text">AppName here</h3>
            { props.user != null ?
                (
                    <Dropdown trigger={
                        <Img className="circle"
                             position="absolute"
                             right="10px"
                             top="15px"
                             src={props.user.picture.data.url}/>
                    }>
                        <NavItem><Input name='group1' type='checkbox' value='vegetarian' label='Vegetarian' /></NavItem>
                        <NavItem><Input name='group1' type='checkbox' value='hypertensive' label='Hypertensive' /></NavItem>
                        <NavItem><Input name='group1' type='checkbox' value='halal' label='Halal Only' /></NavItem>
                        <NavItem><Input name='group1' type='checkbox' value='budget' label='Budget' /></NavItem>
                    </Dropdown>
                ) : (<span></span>) }

        </Div>
    );

};

export default Header;
