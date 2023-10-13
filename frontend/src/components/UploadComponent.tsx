import React, { useState, useCallback } from 'react';
import { Button, Paper } from '@mui/material';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { ResponseData } from '../types';

type UploadComponentProps = {
  setData: React.Dispatch<React.SetStateAction<ResponseData | null>>;
};

function UploadComponent({ setData }: UploadComponentProps) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback(<T extends File>(acceptedFiles: File[]) => {
    setError(null);

    if (acceptedFiles.length === 0) return;
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    multiple: false
  });

  const handleUpload = async () => {
    setError(null);

    if (selectedFile && selectedFile.type !== "text/csv") {
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
    <Paper elevation={3} className="paper">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()}/>
        <p>Drag & drop a CSV file here, or click to select one</p>
        {selectedFile &&
          <p>Selected File: {selectedFile.name}</p>
        }
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button variant="contained" onClick={handleUpload} className="upload-btn">
        Calculate
      </Button>
    </Paper>
  );
}

export default UploadComponent;
