'use client';

import type React from 'react';
import {useState} from 'react';

const LandingPage: React.FC = () => {
  const [responseValue, setResponseValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make a POST request to the API route
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          prompt: inputValue,
        }),
      });
      const data = await response.json();

      if (response.status !== 200) {
        setError(data.message);
      } else {
        setResponseValue(data.response);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-8 text-center">ChatGPT</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {error && (
            <div className="bg-red-500 text-white p-4 mb-4 rounded">
              {error}
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Enter your value"
            className="p-2 w-full border border-gray-300 focus:outline-none flex-1 rounded-r-none rounded-l-md"
          />
          <button
            type="submit"
            className="px-4 py-1 rounded text-white bg-blue-500 hover:bg-blue-600 rounded-l-none rounded-r-md"
          >
            Submit
          </button>
        </div>
      </form>
      <div>
        {responseValue && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Response</h3>
            <p>{responseValue}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default LandingPage;
