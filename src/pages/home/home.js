import * as React from 'react';
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import {useState} from "react";

function Home() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);

    // Add a temp 3-second delay
    setTimeout(() => {
      console.log("Search Submitted:", searchQuery);
      setLoading(false);

      // Temporary response message
      let res = "Your prompt was: " + searchQuery;
      res += ". Service is currently under maintenance. Come back later.";
      setSearchResults(res); // Set the temporary response message as search results
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <TextField
              label="Enter your single prompt"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ width: '100%', maxWidth: 500 }} // Adjust width as needed
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Search</Button>
          </Box>
        </Grid>
        <Grid container item xs={12}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            {/* Results Box */}
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography>Error: {error.message}</Typography>}
            {!loading && !error && <Typography>{searchResults}</Typography>}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
