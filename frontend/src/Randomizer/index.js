import React from 'react';

import {Div, Span, Img, H4} from 'glamorous'


const Randomizer = (props) => {

    return (
        <Div
            className={`${props.className}`}
            position="fixed"
            top="0"
            bottom="0"
            left="0"
            right="0"
            backgroundColor="rgba(0,0,0,0.7)"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            <Span
                color="white"
                position="absolute"
                top="5px"
                right="5px"
                cursor="pointer"
                onClick={props.onClose}
            >
                <i className="material-icons">clear</i>
            </Span>
            <Div>
                <Img
                    src="http://www.kawalingpinoy.com/wp-content/uploads/2014/03/Crispy-Pata-2.jpg"
                    className="circle"
                    width="300px"
                    border="10px solid white"/>
                <H4 className="white-text" marginBottom="0px" fontWeight="bold">Crispy Pata</H4>
                <Span className="white-text" fontStyle="italic" marginBottom="10px">from Kamay Kainan</Span>
                <Div
                    textAlign="center"
                    className="white-text"
                    borderRadius="5px"
                    backgroundColor="rgba(255,255,255,0.2)"
                    marginTop="10px"
                >
                    this is a really good food<br/>
                    good for your health<br/>
                    best food ever
                </Div>
            </Div>
            <Div display="flex"
                 flexDirection="row"
                 justifyContent="space-between"
                 marginTop="20px"
                 width="400px"
            >
                <i className="material-icons red-text circle"
                    style={{
                        background: 'white',
                        padding:'10px',
                        fontSize: '80px'

                    }}
                >clear</i>
                <i className="material-icons green-text circle"
                    style={{
                        background: 'white',
                        padding:'10px',
                        fontSize: '80px'
                    }}
                >add</i>
            </Div>
        </Div>
    );

};

export default Randomizer;
