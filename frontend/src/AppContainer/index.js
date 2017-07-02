import React from 'react';

import Header from './Header';

import {Div} from 'glamorous';

import RestaurantList from './RestaurantList';
import Restaurant from './Restaurant';
import Cart from './Cart';

import Notifications from 'react-notify-toast';
import {Switch, Route} from 'react-router-dom';

const AppContainer = (props) => {

    const onShowChooser = () => {
        props.showChooser();
    };

    return (
        <Div
            display="flex"
            flex="1"
            flexDirection="column"
            height="100%">
            <Header user={props.user} updatePreference={props.updatePreference} showDropdown={props.showDropdown} isDropdownShown={props.isDropdownShown} />
            <Notifications />
            <Switch>
                <Route exact path="/" component={(mProps) => <RestaurantList {...mProps} restaurants={props.restaurants} onShowChooser={onShowChooser} /> } />
                <Route path="/cart" component={(mProps) => <Cart {...mProps} items={props.cart} onOrder={props.onOrder} /> } />
                <Route path="/restaurant/:id" component={(mProps) =>
                    <Restaurant {...mProps} addToCart={props.addToCart} restaurant={props.getRestaurant(mProps.match.params.id)}
                                menu={props.menu} getRestaurantMenu={props.getRestaurantMenu} />
                } />
            </Switch>
        </Div>
    );

};

export default AppContainer;
