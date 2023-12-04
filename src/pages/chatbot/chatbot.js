import * as React from 'react';
import { Box, Grid, TextField, Typography, Button, CircularProgress } from "@mui/material";
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

      setConversation(prev => [...prev, { type: 'bot', text: response }]);
      setInputQuery('');
    }, 3000);
  };

  // Count the number of user queries
  const limit = 10;
  const userQueryCount = conversation.filter(msg => msg.type === 'user').length;
  const isLimitReached = userQueryCount >= limit;

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        {conversation.length > 0 && (
          <Grid item xs={12}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
              {conversation.map((message, index) => (
                <Typography key={index} color={message.type === 'bot' ? 'primary' : 'secondary'}>
                  {message.text}
                </Typography>
              ))}
            </Box>
          </Grid>
        )}

        {!isLimitReached && (
          <Grid item xs={12}>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
              <TextField
                label="Enter your prompt"
                variant="outlined"
                value={inputQuery}
                onChange={handleInputChange}
                disabled={loading}
                sx={{ width: '100%', maxWidth: 500 }}
              />
              <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>Send</Button>
              {loading && <CircularProgress sx={{ mt: 2 }} />}
            </Box>
          </Grid>
        )}

        {isLimitReached && (
          <Grid item xs={12}>
            <Typography sx={{ mt: 2, textAlign: 'center' }}>
              You have reached the maximum number of queries.
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default ChatBot;
