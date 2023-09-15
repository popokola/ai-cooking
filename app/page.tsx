"use client";
import { OpenAI } from 'openai';
import { useState, useEffect } from 'react';
import Link from 'next/link';



export default function Page() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load conversation history from localStorage on initial render
  useEffect(() => {
    const savedConversation = localStorage.getItem('conversation');
    if (savedConversation) {
      setConversation(JSON.parse(savedConversation));
    }
  }, []);

  // Update localStorage whenever the conversation changes
  useEffect(() => {
    localStorage.setItem('conversation', JSON.stringify(conversation));
  }, [conversation]);

  async function handleClik() {
    try {
      setLoading(true);
      // Construct a message object for the user's question
      const userQuestion = { role: 'user', content: question };

      // Update the conversation history with the user's message
      const userMessage = [...conversation, userQuestion];
      setConversation(userMessage);

      // Make the API call with the updated conversation history
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversation: userMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        setAnswer(data);

        // Set the GPT-3 response and update the conversation
        const botMessage = data; // Use the API response as the bot's message
        const newConversationWithBot = [...userMessage, { role: 'assistant', content: botMessage }];
        setConversation(newConversationWithBot);
        setQuestion(''); // Clear the input field
        setLoading(false);
      } else {
        console.error('Error:', response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  }

  function handleDelete(index) {
    // Remove the user message at the specified index from the conversation
    const updatedConversation = [...conversation];
    updatedConversation.splice(index, 1);

    // Check if there is a corresponding assistant message; if yes, remove it as well
    if (index < updatedConversation.length && updatedConversation[index].role === 'assistant') {
      updatedConversation.splice(index, 1);
    }

    setConversation(updatedConversation);
  }

  return (
    <div className='mx-auto pt-12 max-w-7xl px-4 sm:px-6 lg:px-8'>
      <h1>OpenAI Chat</h1>
      <Link href="/recepies">recepies</Link>
      <div className='mx-auto max-w-3xl'>
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 mb-2 ${
              message.role === 'user' ? 'bg-green-500' : 'bg-purple-500'
            } p-2 rounded`}
          >
            <p className='flex-grow'>{message.content}</p>
            {message.role === 'user' && (
              <button onClick={() => handleDelete(index)} className='text-red-600'>
                Delete
              </button>
            )}
          </div>
        ))}
        {loading && <p className='text-center text-gray-500'>Loading...</p>}
      </div>
      <input
        className='text-zinc-900'
        type='text'
        placeholder='Ask a question'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleClik}>Ask</button>
    </div>
  );
}
