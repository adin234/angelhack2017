import React from 'react';

import ChatMessages from './ChatMessages';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';

import glamorous, {Div} from 'glamorous';

const StyledMessages = glamorous(ChatMessages)({
    flex: 1
});

const Chat = (props) => {
    const onSend = function(value) {
        switch (value.trim().toLowerCase()) {
            case 'surprise me':
                props.showChooser();
                break;
        }
    };

    return (
        <Div
            display="flex"
            flex="1"
            flexDirection="column"
            height="100%">
            <ChatHeader />
            <StyledMessages />
            <ChatForm onSend={onSend}/>
        </Div>
    );

};

export default Chat;
