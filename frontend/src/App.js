import React, { Component } from 'react';
import './App.css';

import Login from './Login';
import Chat from './Chat';
import Randomizer from './Randomizer';

import {Div} from 'glamorous';

class App extends Component {
    constructor() {
        super();
        this.state = {
            randomize: false
        };
    }

    render() {
        const showChooser = () => {
            this.setState({randomize: true});
        };

        const hideChooser = () => {
            this.setState({randomize: false});
        };

        return (
            <Div className="App"
                flex="1"
                display="box"
                flexDirection="column"
                position="relative"
                height="100%"
            >
                <Chat showChooser={showChooser}/>
                {this.state.randomize ? (<Randomizer onClose={hideChooser} />) : (<span></span>)}
                {/*<Login name="test" />*/}
            </Div>
        );
    }
}

export default App;
