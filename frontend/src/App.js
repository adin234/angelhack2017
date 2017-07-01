import React, { Component } from 'react';
import './App.css';

import Login from './Login';
import AppContainer from './AppContainer';
import Randomizer from './Randomizer';

import {Div} from 'glamorous';

class App extends Component {
    constructor() {
        super();
        this.state = {
            randomize: false,
            isLoggedIn: false,
            user: null
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

        return (
            <Div className="App"
                flex="1"
                display="box"
                flexDirection="column"
                position="relative"
                height="100%"
            >
                <AppContainer restaurants={[1,2,3,4,5]} showChooser={showChooser} user={this.state.user} />
                {this.state.randomize ? (<Randomizer onClose={hideChooser} />) : (<span></span>)}
                {!this.state.isLoggedIn ? (<Login onLogin={onLogin} />) : (<span></span>)}
            </Div>
        );
    }
}

export default App;
