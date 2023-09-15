import React, { useState, useEffect } from 'react';

function VoiceInput() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  let recognition;

  const addToConversation = (text, role) => {
    const userMessage = { role, content: text };
    setConversation([...conversation, userMessage]);
  };

  // Load conversation history from localStorage on initial render
  useEffect(() => {
    const savedConversation = localStorage.getItem('voiceConversation');
    if (savedConversation) {
      setConversation(JSON.parse(savedConversation));
    }
  }, []);

  // Update localStorage whenever the conversation changes
  useEffect(() => {
    localStorage.setItem('voiceConversation', JSON.stringify(conversation));
  }, [conversation]);

  //after getting the voice input, we need to send it to api/openai to get the response
  const handleSendToOpenAI = () => {
    setIsLoading(true);
    console.log('conversation', conversation); 
    fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conversation: conversation }), // Exclude the system message
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setAnswer(data);
        addToConversation(data, 'assistant');
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleStartListening = () => {
    if (recognition) {
      // Start listening when the button is clicked
      recognition.start();
    }
  };

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


  useEffect(() => {
    if (typeof window !== 'undefined') {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const lastResultIndex = event.results.length - 1;
        const recognizedText = event.results[lastResultIndex][0].transcript;
        setTranscript(recognizedText);
        addToConversation(recognizedText, 'user');
      };

      recognition.onend = () => {
        setIsListening(false);
      };


      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [handleStartListening]);

  return (
    <div>
      <button onClick={handleStartListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Transcript: {transcript}</p>
      <button onClick={handleSendToOpenAI} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send to OpenAI'}
      </button>

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
    </div>
  );
}

export default VoiceInput;
