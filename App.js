import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State to store the list of keys, availability status, and selected key
  const [keys, setKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch keys from the backend when the component mounts
  useEffect(() => {
    const fetchKeys = async () => {
      try {
        setLoading(true);
        const result = await axios.get('/api/storage/keys');
        setKeys(result.data);  // Assuming the response contains the keys
      } catch (error) {
        console.error('Error fetching keys:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeys();
  }, []);

  // Handle form submission (POST request)
  const handleSubmit = async () => {
    if (!selectedKey) {
      setResponse('Please select a key from the options.');
      return;
    }

    try {
      setLoading(true);
      const result = await axios.post('/api/storage/select', selectedKey);
      setResponse(result.data);
    } catch (error) {
      console.error('Error processing the selected key:', error);
      setResponse('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Developer Request Form</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="options-container">
            {keys.map((key, index) => (
              <div
                key={index}
                className={`option ${key.status === 'available' ? 'available' : 'unavailable'}`}
                onClick={() => key.status === 'available' && setSelectedKey(key.name)}
              >
                {key.name}
              </div>
            ))}
          </div>

          <button onClick={handleSubmit}>Submit Request</button>

          <div className="response">
            {response && <p>{response}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
