import React from 'react';

import glamorous, {Div} from 'glamorous'
import {Button} from 'react-materialize';;

const TextArea = glamorous.textarea({
    height:'100%',
    flex: '1'
});
const CustomButton = (props) => (<Button {...props} />);
const StyledButton = glamorous(CustomButton)({
    width:'140px',
    marginLeft:'5px',
    height:'100%'
});

const ChatForm = (props) => {
    let input;

    function handleClick() {
        props.onSend(input.value);
    }

    return (
        <Div
            padding="5px"
            display="flex"
            flexDirection="row"
            height="100px"
            borderTop="2px solid #e1e1e1">
            <TextArea height="100%" flex="1" innerRef={
                (ref) => {
                    return input = ref;
                }
            }/>
            <StyledButton onClick={handleClick}><i className="material-icons right" style={{marginLeft:'0px'}}>send</i>Send</StyledButton>
        </Div>
    );

};

export default ChatForm;
