import { useState } from 'react';

export const useFileUpload = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file, url) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        // Note: When sending FormData, the Content-Type header should not be set
        // as the browser sets it automatically with the correct boundary string
      });

      const responseData = await response.json(); // Assuming the server always returns a JSON response

      if (!response.ok) {
        // If response status is not OK, throw error with server's response message
        throw new Error(responseData.message || `HTTP error status: ${response.status}`);
      }

      setResponse(responseData);
    } catch (error) {
      // Handle fetch errors or custom errors thrown above
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, response, loading, error };
};
