import React from 'react';

import glamorous, {Div, Img, Span} from 'glamorous';
import {Card} from 'react-materialize';

import {Link} from 'react-router-dom';

const StyledLink = glamorous(Link)({
    display: 'inline-block',
    width: 'calc(50% - 10px)',
    margin: '10px 0 0 10px'
});

const Restaurant = (props) => {
    const {restaurant, onSelect} = props;
    return (
        <StyledLink to={'/restaurant/' + restaurant.restaurantId}>
            <Card style={{margin: 0}}>
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
            </Card>
        </StyledLink>
    );
};

const RestaurantList = (props) => {
    console.log(props);
    return (
        <Div display="flex" flexWrap="wrap" margin="-10px 0 0 -10px" padding="5px">
            {props.restaurants.length > 0
                ? (props.restaurants.map((restaurant) => (<Restaurant restaurant={restaurant} key={restaurant.restaurantId} />)))
                : (<span>No restaurants available</span>)
            }
            <i className="material-icons circle" style={{
                position: 'fixed',
                bottom: '10px',
                right: '10px',
                fontSize: '30px',
                padding: '10px',
                backgroundColor: '#008975',
                color: '#ffffff',
                cursor: 'pointer'
            }} onClick={props.onShowChooser}>local_dining</i>
        </Div>
    );

};

export default RestaurantList;
