import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export default function DisplayComponent({ data }: any) {
  function snakeToRegularCase(str: string) {
    return str.split('_').map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  function DisplayValue({ value }: any) {
    if (typeof value === 'object') {
      return (
        <ul>
          {Object.entries(value).map(([key, val]) => (
            <li key={key}>
              {snakeToRegularCase(key)}: <DisplayValue value={val} />
            </li>
          ))}
        </ul>
      );
    }
    return <span>{value}</span>;
  }

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
            {Object.entries(stats as Record<string, any>).map(([key, value]) => (
              <div key={key}>
                {snakeToRegularCase(key)}: <DisplayValue value={value} />
              </div>
            ))}
          </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}