import React from 'react';

import Header from './Header';

import {Div} from 'glamorous';

import RestaurantList from './RestaurantList';

const AppContainer = (props) => {
    const onSend = (value) => {
        switch (value.trim().toLowerCase()) {
            case 'surprise me':
                props.showChooser();
                break;
            default:
                break;
        }
    };

    const onSelect = (props) => {

    };

    return (
        <Div
            display="flex"
            flex="1"
            flexDirection="column"
            height="100%">
            <Header user={props.user} />
            <RestaurantList onSelect={onSelect} restaurants={props.restaurants}/>
        </Div>
    );

};

export default AppContainer;
