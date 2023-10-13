import React from 'react';
import { ResponseData } from '../types';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

type DisplayComponentProps = {
  data: ResponseData;
};

type DisplayValueProps = {
  value: string | number | Record<string, number | string>;
};

export default function DisplayComponent({ data }: DisplayComponentProps) {
  function snakeToRegularCase(str: string): string {
    return str.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  function DisplayValue({ value }: DisplayValueProps) {
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