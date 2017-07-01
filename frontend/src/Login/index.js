import React from 'react';
import {Button} from 'react-materialize';

import {Div} from 'glamorous';

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
            <Button>Hello {props.name}</Button>
        </Div>
    );

};

export default Login;
