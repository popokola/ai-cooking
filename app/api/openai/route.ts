import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  //dangerouslyAllowBrowser: true,
});

export async function POST(req: NextRequest) {
    const { conversation: userMessages } =  await req.json();
 
    console
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
          ...userMessages, // Include the entire conversation history
        ],
    });

   return NextResponse.json(response.choices[0].message.content + ' 🤖');
}

/*
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { question, conversation } = req.body;

      // Construct a message object for the user's question
      const userMessage = { role: 'user', content: question };

      // Update the conversation history with the user's message
      const newConversation = [...conversation, userMessage];

      // Make the API call with the updated conversation history
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          ...newConversation, // Include the entire conversation history
        ],
      });

      // Set the GPT-3 response and update the conversation
      const botMessage = response.choices[0].message.content + ' 🤖';
      const newConversationWithBot = [...newConversation, { role: 'assistant', content: botMessage }];
      res.status(200).json({ botMessage, newConversationWithBot });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}

*/