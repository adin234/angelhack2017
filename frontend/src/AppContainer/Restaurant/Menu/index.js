import React from 'react';

import {Card} from 'react-materialize';
import {Div, Img, Span} from 'glamorous';

const Menu = (props) => {
    const {food} = props;

    return (
            <Card style={{margin: 0}} onClick={() => props.addToCart(food) }>
                <Div width="100%" height="250px" overflow="hidden" position="relative">
                    <Img
                        src={food.thumbnail}
                        position="absolute"
                        left="-1000%"
                        right="-1000%"
                        top="-1000%"
                        bottom="-1000%"
                        margin="auto"
                        width="100%"/>
                </Div>
                <Div marginTop="10px" display="flex" justifyContent="space-between">
                    <Span fontSize="18px" fontWeight="bold">{food.name}</Span>
                    <Span fontSize="18px">{food.price}Php</Span>
                </Div>
            </Card>
    );
};

export default Menu;