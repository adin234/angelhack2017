import React, { Component } from 'react';
import './App.css';

import Login from './Login';
import AppContainer from './AppContainer';
import Randomizer from './Randomizer';
import {notify} from 'react-notify-toast';

import {Div} from 'glamorous';

import 'sanitize.css/sanitize.css';

import _ from 'lodash';

const host = 'http://172.16.1.67:6969';

class App extends Component {
    constructor() {
        super();
        this.state = {
            randomize: false,
            isLoggedIn: false,
            showRestaurants: true,
            isDropdownShown: false,
            restaurants: [],
            user: null,
            menu: [],
            cart: []
        };
    }

    componentWillMount() {
        fetch(host + '/restaurants/list', {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                }
            })
            .then(response => response.json())
            .then(json => this.setState({restaurants: json.map(e => {
                e.thumbnail = host + '/images/' + e.image;
                return e;
            })}));
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
                if (cartItem.food.food_id === food.food_id && cartItem.restaurant.restaurant_id === restaurant.restaurant_id) {
                    notify.show(food.name + ' from ' + restaurant.name + ' already added to cart.');
                    return;
                }
            }

            this.setState({
                cart: [...this.state.cart, {food: food, restaurant: restaurant}]
            });

            notify.show('Added ' + food.name + ' from ' + restaurant.name + ' to cart.');
        };

        const getRestaurantMenu = (id) => {
            fetch(host + '/menu/' + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type' : 'application/json',
                    }
                })
                .then(response => response.json())
                .then(json => {
                    if (isDifferent(json, this.state.menu, 'foodId')) {
                        this.setState({menu: json.map(e => {
                            e.thumbnail = host + '/images/' + e.image;

                            return e;
                        })});
                    }
                })
                .catch(() => {
                    if (this.state.menu.length !== 0) {
                        this.setState({menu: []});
                    }
                });
        };

        const isDifferent = (n, base, key) => {
            const a = n.map(e => e[key]);
            const b = base.map(e => e[key]);

            return _.difference(a, b).length;
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
                <AppContainer restaurants={this.state.restaurants} isDropdownShown={this.state.isDropdownShown}
                              showDropdown={showDropdown} showChooser={showChooser} user={this.state.user}
                              cart={this.state.cart} addToCart={addToCart} menu={this.state.menu} getRestaurantMenu={getRestaurantMenu} />
                {this.state.randomize ? (<Randomizer onClose={hideChooser} />) : (<span></span>)}
                {!this.state.isLoggedIn ? (<Login onLogin={onLogin} />) : (<span></span>)}
            </Div>
        );
    }
}

export default App;
