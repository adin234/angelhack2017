import React from 'react';

import glamorous, {Div, Img} from 'glamorous';
import {Card} from 'react-materialize';

const StyledCard = glamorous(Card)({
    display: 'inline-block',
    width: 'calc(50% - 10px)',
    margin: '10px 0 0 10px'
});

const Restaurant = (props) => {
    return <StyledCard/>;
};

const RestaurantList = (props) => {
    return (
        <Div display="flex" flexWrap="wrap" margin="-10px 0 0 -10px" padding="5px">
            {props.restaurants.length > 0
                ? (props.restaurants.map((restaurant) => (<Restaurant restaurant={restaurant} />)))
                : (<span>No restaurants available</span>)
            }
        </Div>
    );

};

export default RestaurantList;
