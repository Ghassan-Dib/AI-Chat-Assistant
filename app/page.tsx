'use client';

// import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  Sidebar,
  ConversationList,
  Conversation,
  Avatar,
  ChatContainer,
  ConversationHeader,
  MessageGroup,
  Message,
  MessageList,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

import {
  useChat,
  ChatMessage,
  MessageContentType,
  MessageDirection,
  MessageStatus,
} from '@chatscope/use-chat';

import { MessageContent, TextContent, User } from '@chatscope/use-chat';

const Chat = () => {
  const {
    currentMessages,
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    getUser,
    currentMessage,
    setCurrentMessage,
    sendTyping,
    setCurrentUser,
  } = useChat();

  return (
    <body>
      <MainContainer responsive>
        <ChatContainer>
          <MessageList>
            <Message
              model={{
                message: 'This is the map Assistant. How can I help you today?',
                sentTime: 'just now',
                sender: 'Ghassan',
                direction: 'incoming',
                position: 'single',
              }}
            />
          </MessageList>
          <MessageInput placeholder='Type message here' />
        </ChatContainer>
      </MainContainer>
    </body>
  );
};

export default Chat;
