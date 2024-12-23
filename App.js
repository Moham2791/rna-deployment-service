import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State to store the list of keys and the selected key
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
        setKeys(result.data);
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
      setResponse('Please select a key from the dropdown.');
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
          <div>
            <label htmlFor="key-dropdown">Select Project:</label>
            <select
              id="key-dropdown"
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
            >
              <option value="">--Select--</option>
              {keys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
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
