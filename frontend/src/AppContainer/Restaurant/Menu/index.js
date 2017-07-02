import React from 'react';

import {Card} from 'react-materialize';
import {Div, Img, Span} from 'glamorous';

const Menu = (props) => {
    const {food} = props;

    return (
        <Card style={{ margin: '0 0 5px 0'}} onClick={() => props.addToCart(food) }>
            <Div display="flex" alignItems="center" justifyContent="space-between">
                <Div display="flex" alignItems="center">
                    <Img
                        src={food.thumbnail}
                        margin="auto"
                        height="45px"
                        width="45px"/>
                    <Span fontSize="18px" fontWeight="bold" marginLeft="10px">{food.name}</Span>
                </Div>
                <Span fontSize="18px">{food.price}Php</Span>
            </Div>
        </Card>
    );
};

export default Menu;