import React, { useState, ChangeEvent } from 'react';
import { Button, Paper } from '@mui/material';
import axios from 'axios';

function UploadComponent({ setData }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error uploading CSV:", error);
      // Here you can also set some state to show an error message to the user
    }
  };

  return (
    <Paper elevation={3}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload}>
        Upload
      </Button>
    </Paper>
  );
}

export default UploadComponent;
