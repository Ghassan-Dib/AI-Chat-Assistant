import {
  MessageContent,
  MessageContentType,
  MessageDirection,
} from '@chatscope/use-chat';
import { OpenAIApi, Configuration } from 'openai';

export const processMessageToChatGPT = async (
  inputText: MessageContent<MessageContentType>
) => {
  try {
    const openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      })
    );

    const messages: any = [
      {
        role: 'system',
        content: `extract and return the address (country name) and climate condition as one object from the response: ${inputText}, 
        if the response doesn't contain the address or climate condition, return an empty object, and mention the reason in the response.`,
      },
      { role: 'user', content: inputText },
    ];

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 150,
    });

    const generatedText = response?.data?.choices[0]?.message?.content;

    return {
      content: generatedText,
      direction: MessageDirection.Incoming,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong');
  }
};
