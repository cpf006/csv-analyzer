import React, { useRef, useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { ResponseData } from '../types';

type UploadComponentProps = {
  setData: React.Dispatch<React.SetStateAction<ResponseData | null>>;
};

function UploadComponent({ setData }: UploadComponentProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = async () => {
    setError(null);

    if (!selectedFile || selectedFile.type !== "text/csv") {
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
      setError("Error uploading CSV. Please try again.");
    }
  };

  return (
    <Paper elevation={3} className="paper" style={{ padding: '20px' }}>
      <div className="file-input">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
          data-testid="file-input"
        />
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: '#1a1a1a', color: 'white' }}
            onClick={() => fileInputRef.current?.click()}
          >
            Choose CSV File
          </Button>
        </div>
        <div
          style={{ marginTop: '10px' }}
        >
          {selectedFile && 
            <Typography 
              variant="contained"
              color="primary" 
              
            >
                Selected File: {selectedFile.name}
            </Typography>
          }
        </div>
      </div>
      {error && <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleUpload} className="upload-btn" style={{ marginTop: '20px' }}>
        Calculate
      </Button>
    </Paper>
  );
}

export default UploadComponent;
