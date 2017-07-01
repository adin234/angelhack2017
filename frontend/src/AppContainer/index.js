import React from 'react';

import Header from './Header';

import {Div} from 'glamorous';

import RestaurantList from './RestaurantList';
import Restaurant from './Restaurant';

import {Switch, Route} from 'react-router-dom';

const AppContainer = (props) => {
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
                <Route path="/restaurant/:id" component={(mProps) => <Restaurant {...mProps} restaurant={getRestaurant(mProps)} />} />
            </Switch>
        </Div>
    );

};

export default AppContainer;
