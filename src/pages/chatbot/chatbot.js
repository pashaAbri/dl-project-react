import * as React from 'react';
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";

function ChatBot() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [inputQuery, setInputQuery] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleInputChange = (event) => {
    setInputQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);

    // Add the user query to the conversation
    setConversation(prev => [...prev, { type: 'user', text: inputQuery }]);

    // Add a temp 3-second delay
    setTimeout(() => {
      setLoading(false);

      // Temporary response message
      let response = "Your prompt was: " + inputQuery;
      response += ". Service is currently under maintenance. Come back later.";

      // Add the bot response to the conversation
      setConversation(prev => [...prev, { type: 'bot', text: response }]);

      // Clear the input field
      setInputQuery('');
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <TextField
              label="Enter your prompt"
              variant="outlined"
              value={inputQuery}
              onChange={handleInputChange}
              sx={{ width: '100%', maxWidth: 500 }} // Adjust width as needed
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Send</Button>
          </Box>
        </Grid>
        <Grid container item xs={12}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            {/* Conversation Box */}
            {conversation.map((message, index) => (
              <Typography key={index} color={message.type === 'bot' ? 'primary' : 'secondary'}>
                {message.text}
              </Typography>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ChatBot;
