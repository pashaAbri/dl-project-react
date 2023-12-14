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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json(); // or .text() if your server returns plain text
      setResponse(responseData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, response, loading, error };
};
