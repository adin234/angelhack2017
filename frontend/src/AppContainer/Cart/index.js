import React from 'react';

import {Link} from 'react-router-dom';

import glamorous, {Div, H4} from 'glamorous';

import {Button} from 'react-materialize';

import CartItem from './CartItem';

const CustomButton = (props) => (<Button className={`${props.className}`} {...props} />);
const StyledButton = glamorous(CustomButton)({
    display: 'block',
    width: '100%',
    marginTop: '20px'
});


const Cart = (props) => {
    const restaurants = {};

    props.items.forEach(e => {
        if (!restaurants[e.restaurant.name]) {
            restaurants[e.restaurant.name] = [];
        }

        restaurants[e.restaurant.name].push(e);
    });

    return (
        <div>
            <Link to="/"> Home </Link>
            <Div padding="10px">
                {
                    (Object.keys(restaurants).length > 0
                        ?
                            Object.keys(restaurants).map(i => {
                                return (
                                    <Div key={i}>
                                        <H4 textAlign="left">{i}</H4>
                                        <Div>
                                            {restaurants[i].map(e => <CartItem food={e} />)}
                                        </Div>
                                    </Div>
                                )
                            })
                        : (<span>No Items in Cart</span>)
                    )
                }
                {
                    (Object.keys(restaurants).length > 0
                            ? <StyledButton onClick={props.onOrder}> Order Now </StyledButton>
                            : <span></span>)
                }
            </Div>
        </div>
    );
};

export default Cart;