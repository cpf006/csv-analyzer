import { Button } from '@mui/material';
import React, { ChangeEvent } from 'react';

function UploadComponent() {
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        console.log(file);
        // Logic to read and process the CSV file
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleUpload}
        style={{ display: 'none' }}
        id="upload-csv"
      />
      <label htmlFor="upload-csv">
        <Button variant="contained" component="span">
          Upload CSV
        </Button>
      </label>
    </div>
  );
}

export default UploadComponent;
