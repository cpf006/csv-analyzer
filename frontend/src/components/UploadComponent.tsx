import React, { useState, ChangeEvent } from 'react';
import { Button, Paper } from '@mui/material';
import axios from 'axios';

function UploadComponent({ setData }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    if (selectedFile.type !== "text/csv") {
      setError("Please upload a valid CSV file.");
      return;
    }

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
    <Paper elevation={3} className="paper">
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button variant="contained" onClick={handleUpload} className="upload-btn">
        Calculate
      </Button>
    </Paper>
  );
}

export default UploadComponent;
