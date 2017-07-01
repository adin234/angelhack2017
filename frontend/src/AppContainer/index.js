import React from 'react';

import Header from './Header';

import {Div} from 'glamorous';

import RestaurantList from './RestaurantList';
import Restaurant from './Restaurant';

import {Switch, Route} from 'react-router-dom';

const AppContainer = (props) => {
    const dummyMenu = [
        {
            foodId: 1,
            name: "Burger",
            price: 69,
            thumbnail: "https://d34nj53l8zkyd3.cloudfront.net/ph/view/2ce8e502a7"
        },
        {
            foodId: 1,
            name: "Cake",
            price: 70,
            thumbnail: "https://d34nj53l8zkyd3.cloudfront.net/ph/view/2ce8e502a7"
        },
        {
            foodId: 1,
            name: "Spaghetti",
            price: 71,
            thumbnail: "https://d34nj53l8zkyd3.cloudfront.net/ph/view/2ce8e502a7"
        },
        {
            foodId: 1,
            name: "Italian Chicken Ala King",
            price: 72,
            thumbnail: "https://d34nj53l8zkyd3.cloudfront.net/ph/view/2ce8e502a7"
        },
        {
            foodId: 1,
            name: "French Fries",
            price: 73,
            thumbnail: "https://d34nj53l8zkyd3.cloudfront.net/ph/view/2ce8e502a7"
        }
    ];

    const onShowChooser = () => {
        props.showChooser();
    };

    const getRestaurant = (mProps) => {
        for (let i in props.restaurants) {
            if (+props.restaurants[i].restaurantId === +mProps.match.params.id) {
                return props.restaurants[i];
            }
        }
        return props.restaurants[0];
    };

    return (
        <Div
            display="flex"
            flex="1"
            flexDirection="column"
            height="100%">
            <Header user={props.user} />
            <Switch>
                <Route exact path="/" component={(mProps) => <RestaurantList {...mProps} restaurants={props.restaurants} onShowChooser={onShowChooser} /> } />
                <Route path="/restaurant/:id" component={(mProps) => <Restaurant {...mProps} restaurant={getRestaurant(mProps)} menu={props.menu || dummyMenu} />} />
            </Switch>
        </Div>
    );

};

export default AppContainer;
