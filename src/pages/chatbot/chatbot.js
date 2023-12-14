import * as React from 'react';
import { Box, Grid, TextField, Typography, Button, CircularProgress, Input } from "@mui/material";
import { useState } from "react";

function ChatBot() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [inputQuery, setInputQuery] = useState('');
  const [file, setFile] = useState(null);
  const [conversation, setConversation] = useState([]);

  const handleInputChange = (event) => {
    setInputQuery(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);

    // Handle text query submission
    if (inputQuery) {
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
    }

    // Handle file upload
    if (file) {
      // Implement file handling logic here
      console.log("File uploaded:", file.name);
      // Add file upload message to conversation
      setConversation(prev => [...prev, { type: 'user', text: `File uploaded: ${file.name}` }]);
      setFile(null); // Clear the file input
    }
  };

  // Count the number of user queries
  const userQueryCount = conversation.filter(msg => msg.type === 'user').length;
  const isLimitReached = userQueryCount >= 10;

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        {/* Conversation history */}
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

        {/* Input and File Upload area */}
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
              <Input
                type="file"
                onChange={handleFileChange}
                disabled={loading}
                sx={{ mt: 2, width: '100%', maxWidth: 500 }}
              />
              <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>Send</Button>
              {loading && <CircularProgress sx={{ mt: 2 }} />}
            </Box>
          </Grid>
        )}

        {/* Limit reached message */}
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
