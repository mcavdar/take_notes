import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [texts, setTexts] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  // Handle form submission to save text
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text) {
      try {
        await axios.post('http://your_ip/api/text', { content: text });
        setText('');
        fetchTexts();  // Refresh the list of texts
      } catch (error) {
        console.error('Error saving text:', error);
      }
    }
  };

  // Fetch all texts from the backend
  const fetchTexts = async () => {
    try {
      const response = await axios.get('http://your_ip/api/texts');
      setTexts(response.data);
    } catch (error) {
      console.error('Error fetching texts:', error);
    }
  };
  
  // Handle deletion of a text item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://your_ip/api/text/${id}`);
      fetchTexts();  // Refresh the list of texts
    } catch (error) {
      console.error('Error deleting text:', error);
    }
  };

  useEffect(() => {
    fetchTexts();  // Load texts when component mounts
  }, []);

  return (
    <div className="App">
      <h1>Text Recorder</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={handleInputChange}
          placeholder="Enter some text..."
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Save Text</button>
      </form>
      <h2>Saved Texts</h2>
      <ul>
        {texts.map((textItem) => (
          <li key={textItem.id}>
            <strong>{new Date(textItem.created_at).toLocaleString()}</strong>: {textItem.content}
            <button onClick={() => handleDelete(textItem.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
