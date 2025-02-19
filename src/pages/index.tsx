'use client';
import { useState } from 'react';
import Chat from '../components/Chat';
import {
  ChatMessage,
  MessageContent,
  MessageContentType,
  MessageDirection,
  MessageStatus,
  TextContent,
} from '@chatscope/use-chat';

const App = () => {
  const greetingMessage = new ChatMessage({
    id: '',
    senderId: '',
    status: MessageStatus.Sent,
    direction: MessageDirection.Incoming,
    contentType: MessageContentType.TextHtml,
    content:
      "Hello, I'm the AI Map Assistant, ask me anything!" as unknown as MessageContent<TextContent>,
  });

  const [messages, setMessages] = useState<ChatMessage<MessageContentType>[]>([
    greetingMessage,
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message: String) => {
    const newMessage = new ChatMessage({
      id: '',
      senderId: '',
      content: message as unknown as MessageContent<TextContent>,
      status: MessageStatus.Sent,
      direction: MessageDirection.Outgoing,
      contentType: MessageContentType.TextHtml,
    });

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText: message }),
      });
      const data = await response.json();
      setMessages((prevMessages: any) => [...prevMessages, data]);
      setIsTyping(false);
    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  };

  return <Chat messages={messages} isTyping={isTyping} onSend={handleSend} />;
};

export default App;
