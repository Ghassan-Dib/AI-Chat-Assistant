import React from 'react';
import {
  MainContainer,
  ChatContainer,
  Message,
  MessageList,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { ChatMessage, MessageContentType } from '@chatscope/use-chat';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

interface ChatProps {
  messages: ChatMessage<MessageContentType>[];
  isTyping: boolean;
  onSend: (message: String) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, isTyping, onSend }) => {
  return (
    <MainContainer>
      <ChatContainer>
        <MessageList
          scrollBehavior='smooth'
          typingIndicator={
            isTyping ? <TypingIndicator content='typing..' /> : null
          }
        >
          {messages.map((message, i) => {
            return (
              <Message
                key={i}
                model={{
                  payload: message.content,
                  direction: message.direction,
                  position: 'normal',
                }}
              />
            );
          })}
        </MessageList>
        <MessageInput
          attachButton={false}
          placeholder='ask your question here...'
          onSend={onSend}
        />
      </ChatContainer>
    </MainContainer>
  );
};

export default Chat;
