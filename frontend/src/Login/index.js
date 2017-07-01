import React from 'react';

import {Div} from 'glamorous';
import FacebookLogin from 'react-facebook-login';

const Login = (props) => {
    return (
        <Div
            className={`${props.className}`}
            position="absolute"
            top="0"
            bottom="0"
            left="0"
            right="0"
            backgroundColor="rgba(0,0,0,0.7)"
            display="flex"
            justifyContent="center"
            alignItems="center">
            <FacebookLogin
                appId="1823811157946623"
                autoLoad={true}
                fields="name,email,picture"
                callback={props.onLogin} />
        </Div>
    );

};

export default Login;
