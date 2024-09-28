import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://spam-pr.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Spam Detection</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here"
            rows="5"
          />
          <button type="submit" disabled={!message || loading}>
            {loading ? 'Checking...' : 'Check for Spam'}
          </button>
        </form>
        {result && (
          <div className="result">
            <h2>Result: {result}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
