'use client'

import React, { useState } from 'react';
import UploadComponent from '../components/UploadComponent';
import DisplayComponent from '../components/DisplayComponent';
import Container from '@mui/material/Container';

export default function Page() {
  const [data, setData] = useState(null);

  return (
    <Container maxWidth="sm">
      <UploadComponent setData={setData} />
      {data && <DisplayComponent data={data} />}
    </Container>
  );
}
