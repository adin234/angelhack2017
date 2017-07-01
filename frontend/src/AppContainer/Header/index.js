import React from 'react';

import {Div, Img} from 'glamorous';

const Header = (props) => {

    return (
        <Div
            position="relative"
            className="teal"
        >
            <h3 className="white-text">AppName here</h3>
            { props.user != null ?
                (
                    <Img className="circle"
                         position="absolute"
                         right="10px"
                         top="15px"
                         src={props.user.picture.data.url} />
                ) : (<span></span>) }

        </Div>
    );

};

export default Header;
