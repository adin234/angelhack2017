import React, { Component } from 'react';
import './App.css';

import Login from './Login';
import AppContainer from './AppContainer';
import Randomizer from './Randomizer';
import {notify} from 'react-notify-toast';

import {Div} from 'glamorous';

import 'sanitize.css/sanitize.css';

import _ from 'lodash';

const host = 'http://localhost:6969';

const toQueryString = (obj) => {
    let parts = [];
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
    }
    return parts.join("&");
};

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
            cart: [],
            recommendations: [],
            preferences: {
                halal: false,
                vegetarian: false,
                budget: false,
                hypertensive: false
            }
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

        this.recommendFood();
    }

    recommendFood() {
        const params = toQueryString(this.state.preferences);

        const notInCart = (e) => {
            const ids = this.state.cart.map(e => e.food.food_id);
            return !~ids.indexOf(e.food_id);
        };

        fetch(host + '/recommend/' + 1 + '?' + params, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                }
            })
            .then(response => response.json())
            .then(json => {
                this.setState({recommendations: json.map(e => {
                    e.thumbnail = host + '/images/' + e.image;
                    return e;
                }).filter(notInCart)});
            })
            .catch(() => {
                if (this.state.menu.length !== 0) {
                    this.setState({menu: []});
                }
            });
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

        const onDeny = () => {
            let oldRecommendations = this.state.recommendations;
            oldRecommendations.shift();
            this.setState({recommendations: oldRecommendations});
        };

        const addToCart = (food, restaurant) => {
            for (let i in this.state.cart) {
                let cartItem = this.state.cart[i];
                if (cartItem.food.food_id === food.food_id && cartItem.restaurant.restaurant_id === restaurant.restaurant_id) {
                    notify.show(food.name + ' from ' + restaurant.name + ' already added to cart.', 'warning', 1000, '#000000');
                    return;
                }
            }

            this.setState({
                cart: [...this.state.cart, {food: food, restaurant: restaurant}]
            });

            hideChooser();
            onDeny();

            notify.show('Added ' + food.name + ' from ' + restaurant.name + ' to cart.', 'success', 1000, '#000000');
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
                    if (isDifferent(json, this.state.menu, 'food_id')) {
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

        const getRestaurant = (id) => {
            for (let i in this.state.restaurants) {
                if (+this.state.restaurants[i].restaurant_id === +id) {
                    getRestaurantMenu(id);
                    return this.state.restaurants[i];
                }
            }
            return this.state.restaurants[0];
        };

        const updatePreference = (type, input) => {
            const toUpdate = this.state.preferences;
            toUpdate[type] = !toUpdate[type];
            this.setState({preferences: toUpdate});
            this.recommendFood();
        };

        const onOrder = () => {
            notify.show('Successfully ordered ' + this.state.cart.length + ' items', 'success', 1000, '#000000');
            this.setState({cart: []});
        };

        return (
            <Div className="App"
                 flex="1"
                 display="box"
                 flexDirection="column"
                 position="relative"
                 height="100%"
                 background="#EEEEEE">
                <AppContainer restaurants={this.state.restaurants} isDropdownShown={this.state.isDropdownShown} updatePreference={updatePreference}
                              showDropdown={showDropdown} showChooser={showChooser} user={this.state.user} getRestaurant={getRestaurant}
                              cart={this.state.cart} addToCart={addToCart} menu={this.state.menu} getRestaurantMenu={getRestaurantMenu}
                              onOrder={onOrder} />
                {this.state.randomize ? (<Randomizer onClose={hideChooser}
                                                     onDeny={onDeny} onAdd={addToCart}
                                                     getRestaurant={getRestaurant} recommendations={this.state.recommendations}/>) : (<span></span>)}
                {!this.state.isLoggedIn ? (<Login onLogin={onLogin} />) : (<span></span>)}
            </Div>
        );
    }
}

export default App;
