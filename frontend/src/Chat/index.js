import React from 'react';

import ChatMessages from './ChatMessages';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';

import glamorous, {Div} from 'glamorous';

const StyledMessages = glamorous(ChatMessages)({
    flex: 1
});

const Chat = (props) => {

    return (
        <Div
            display="flex"
            flex="1"
            flexDirection="column"
            height="100%">
            <ChatHeader />
            <StyledMessages />
            <ChatForm/>
        </Div>
    );

};

export default Chat;
