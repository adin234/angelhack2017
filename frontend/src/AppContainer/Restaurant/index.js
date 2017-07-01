import React from 'react';

import {Div, Img, Span} from 'glamorous';
import {Link} from 'react-router-dom';

const Restaurant = (props) => {
    const {restaurant} = props;

    return (
        <Div
            position="relative"
        >
            <Link to="/"> Home </Link>
            <Img width="100%" src={restaurant.thumbnail} />
            <Div position="absolute" bottom="0px" display="flex"
                 background="rgba(0,0,0,.3)" padding="5px" fontWeight="bold" width="100%" color="white"
                 fontSize="16px" justifyContent="space-between"
            >
                <Span>{restaurant.restaurantName}</Span>
                <Span>{restaurant.distance}km</Span>
            </Div>
        </Div>
    );

};

export default Restaurant;
