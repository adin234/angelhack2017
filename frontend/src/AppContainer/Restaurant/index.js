import React from 'react';

import {H4, Div, Img, Span} from 'glamorous';
import {Link} from 'react-router-dom';

import Menu from './Menu';

const Restaurant = (props) => {
    const {restaurant} = props;

    return (
        <Div>
            <Link to="/"> Home </Link>
            <Div
                position="relative"
            >
                <Img width="100%" src={restaurant.thumbnail} />
                <Div position="absolute" bottom="0px" display="flex"
                     background="rgba(0,0,0,.3)" padding="5px" fontWeight="bold" width="100%" color="white"
                     fontSize="16px" justifyContent="space-between"
                >
                    <Span>{restaurant.restaurantName}</Span>
                    <Span>{restaurant.distance}km</Span>
                </Div>
            </Div>
            <Div
                padding="5px">
                <H4 textAlign="left">Menu</H4>
                { props.menu.length > 0
                    ? props.menu.map((menu) => <Menu addToCart={(food) => props.addToCart(food, restaurant)} food={menu} key={menu.foodId} />)
                    : <span>No Menu Available</span> }

            </Div>
        </Div>
    );

};

export default Restaurant;
