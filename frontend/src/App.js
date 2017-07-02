import React, { Component } from 'react';
import './App.css';

import Login from './Login';
import AppContainer from './AppContainer';
import Randomizer from './Randomizer';
import {notify} from 'react-notify-toast';

import {Div} from 'glamorous';

import 'sanitize.css/sanitize.css';

const restaurants = [{
    restaurantId: 1,
    restaurantName: 'a',
    thumbnail: 'https://d34nj53l8zkyd3.cloudfront.net/ph/view/2ce8e502a7',
    distance: '4.5'
}, {
    restaurantId: 2,
    restaurantName: 'ba',
    thumbnail: 'https://employmenthub.co/images/logos/Mcdonald%27s.jpg',
    distance: '4.5'
}, {
    restaurantId: 3,
    restaurantName: 'bca',
    thumbnail: 'https://d34nj53l8zkyd3.cloudfront.net/ph/view/2ce8e502a7',
    distance: '4.5'
}, {
    restaurantId: 4,
    restaurantName: 'abcd',
    thumbnail: 'https://d34nj53l8zkyd3.cloudfront.net/ph/view/2ce8e502a7',
    distance: '4.5'
}, {
    restaurantId: 5,
    restaurantName: 'abcde',
    thumbnail: 'https://employmenthub.co/images/logos/Mcdonald%27s.jpg',
    distance: '4.5'
}, {
    restaurantId: 6,
    restaurantName: 'abcdef',
    thumbnail: 'https://employmenthub.co/images/logos/Mcdonald%27s.jpg',
    distance: '4.5'
}, {
    restaurantId: 7,
    restaurantName: 'abcdefg',
    thumbnail: 'https://d34nj53l8zkyd3.cloudfront.net/ph/view/2ce8e502a7',
    distance: '4.5'
}];

class App extends Component {
    constructor() {
        super();
        this.state = {
            randomize: false,
            isLoggedIn: false,
            showRestaurants: true,
            isDropdownShown: false,
            user: null,
            cart: []
        };
    }

    render() {
        const showChooser = () => {
            this.setState({randomize: true});
        };

        const hideChooser = () => {
            this.setState({randomize: false});
        };

        const onLogin = (data) => {
            this.setState({
                isLoggedIn: true,
                user: data
            });
        };

        const showDropdown = () => {
            this.setState({
                isDropdownShown: true
            })
        };

        const addToCart = (food, restaurant) => {
            for (let i in this.state.cart) {
                let cartItem = this.state.cart[i];
                if (cartItem.food.foodId === food.foodId && cartItem.restaurant.restaurantId === restaurant.restaurantId) {
                    return;
                }
            }

            this.setState({
                cart: [...this.state.cart, {food: food, restaurant: restaurant}]
            });

            notify.show('Added ' + food.name + ' from ' + restaurant.restaurantName + ' to cart.');
        };

        return (
            <Div className="App"
                 flex="1"
                 display="box"
                 flexDirection="column"
                 position="relative"
                 height="100%"
                 background="#EEEEEE"
            >
                <AppContainer restaurants={restaurants} isDropdownShown={this.state.isDropdownShown}
                              showDropdown={showDropdown} showChooser={showChooser} user={this.state.user}
                              cart={this.state.cart} addToCart={addToCart}/>
                {this.state.randomize ? (<Randomizer onClose={hideChooser} />) : (<span></span>)}
                {!this.state.isLoggedIn ? (<Login onLogin={onLogin} />) : (<span></span>)}
            </Div>
        );
    }
}

export default App;
