'use client'

import UploadComponent from '../components/UploadComponent';
import DisplayComponent from '../components/DisplayComponent';
import { Button } from '@mui/material';
import React, { useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null); // Placeholder for CSV data

  const handleCalculate = () => {
    // Logic to process the CSV and set the data
  };

  return (
    <div>
      <UploadComponent />
      <Button variant="contained" onClick={handleCalculate}>
        Calculate
      </Button>
      {data && <DisplayComponent data={data} />}
    </div>
  );
}