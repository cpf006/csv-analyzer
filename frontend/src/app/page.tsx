'use client'

import React, { useState } from 'react';
import UploadComponent from '../components/UploadComponent';
import DisplayComponent from '../components/DisplayComponent';

export default function Page() {
  const [data, setData] = useState(null);

  return (
    <div>
      <UploadComponent setData={setData} />
      {data && <DisplayComponent data={data} />}
    </div>
  );
}