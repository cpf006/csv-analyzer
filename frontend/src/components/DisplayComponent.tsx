import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export default function DisplayComponent({ data }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Column</TableCell>
          <TableCell>Statistics</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(data).map(([column, stats]) => (
          <TableRow key={column}>
            <TableCell>{column}</TableCell>
            <TableCell>
              {Object.entries(stats).map(([key, value]) => (
                <div key={key}>
                  {key}: {JSON.stringify(value)}
                </div>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}