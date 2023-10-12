'use client'

import React, { useState } from 'react';
import UploadComponent from '../components/UploadComponent';
import DisplayComponent from '../components/DisplayComponent';
import { Typography, Container } from '@mui/material';

export default function Page() {
  const [data, setData] = useState(null);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" mt={2} style={{ color: '#ffffff' }}>
        CSV Analytics App
      </Typography>
      <UploadComponent setData={setData} />
      {data && <DisplayComponent data={data} />}
    </Container>
  );
}
