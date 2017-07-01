import React from 'react';

import glamorous, {Div, Img, Span} from 'glamorous';
import {Card} from 'react-materialize';

const StyledCard = glamorous(Card)({
    display: 'inline-block',
    width: 'calc(50% - 10px)',
    margin: '10px 0 0 10px'
});

const Restaurant = (props) => {
    const {restaurant} = props;
    return (
        <StyledCard>
            <Div width="100%" height="250px" overflow="hidden" position="relative">
                <Img
                    src={restaurant.thumbnail}
                    position="absolute"
                    left="-1000%"
                    right="-1000%"
                    top="-1000%"
                    bottom="-1000%"
                    margin="auto"
                    width="100%"/>
            </Div>
            <Div marginTop="10px" display="flex" justifyContent="space-between">
                <Span fontSize="18px" fontWeight="bold">{restaurant.restaurantName}</Span>
                <Span fontSize="18px">{restaurant.distance}km</Span>
            </Div>
        </StyledCard>
    );
};

const RestaurantList = (props) => {
    return (
        <Div display="flex" flexWrap="wrap" margin="-10px 0 0 -10px" padding="5px">
            {props.restaurants.length > 0
                ? (props.restaurants.map((restaurant) => (<Restaurant restaurant={restaurant} key={restaurant.restaurantId} />)))
                : (<span>No restaurants available</span>)
            }
        </Div>
    );

};

export default RestaurantList;
