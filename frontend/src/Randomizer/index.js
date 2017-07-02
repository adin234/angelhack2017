import React from 'react';

import {Div, Span, Img, H4} from 'glamorous'


const Randomizer = (props) => {
    const food = props.recommendations[0];
    let restaurant;

    if (food!=null) {
        restaurant = props.getRestaurant(food.restaurant_id);
    }

    return (
        food == null
            ? (
                <Div
                    className={`${props.className}`}
                    position="fixed"
                    top="0"
                    bottom="0"
                    left="0"
                    right="0"
                    backgroundColor="rgba(0,0,0,0.7)"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center">
                    <Span fontWeight="bold" fontSize="18px" color="white">No more food to recommend,<br/>check preferences</Span>
                </Div>)
            : (
                <Div
                    className={`${props.className}`}
                    position="fixed"
                    top="0"
                    bottom="0"
                    left="0"
                    right="0"
                    backgroundColor="rgba(0,0,0,0.7)"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center">
                    <Span
                        color="white"
                        position="absolute"
                        top="5px"
                        right="5px"
                        cursor="pointer"
                        onClick={props.onClose}
                    >
                        <i className="material-icons">clear</i>
                    </Span>
                    <Div>
                        <Img
                            src={food.thumbnail}
                            className="circle"
                            width="300px"
                            height="300px"
                            border="10px solid white"/>
                        <H4 className="white-text" marginBottom="0px" fontWeight="bold">{food.name}</H4>
                        <Span className="white-text" fontStyle="italic" marginBottom="10px">from {restaurant.name}</Span>
                        <Div
                            textAlign="center"
                            className="white-text"
                            borderRadius="5px"
                            backgroundColor="rgba(255,255,255,0.2)"
                            marginTop="10px"
                        >
                            this {food.name}<br/>
                            is from {restaurant.name}<br/>
                            you should try it
                        </Div>
                    </Div>
                    <Div display="flex"
                         flexDirection="row"
                         justifyContent="space-between"
                         marginTop="20px"
                         width="400px"
                    >
                        <i onClick={props.onDeny} className="material-icons red-text circle"
                            style={{
                                background: 'white',
                                padding:'10px',
                                fontSize: '80px',
                                cursor: 'pointer'

                            }}
                        >clear</i>
                        <i onClick={() => props.onAdd(food, restaurant)} className="material-icons green-text circle"
                            style={{
                                background: 'white',
                                padding:'10px',
                                fontSize: '80px',
                                cursor: 'pointer'
                            }}
                        >add</i>
                    </Div>
                </Div>
            )
    );

};

export default Randomizer;
