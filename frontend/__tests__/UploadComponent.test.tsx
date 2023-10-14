import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UploadComponent from '../src/components/UploadComponent';

// Mocking the axios module to simulate API calls
jest.mock('axios');

describe('UploadComponent', () => {
  it('renders the calculate button', () => {
    render(<UploadComponent setData={jest.fn()} />);
    expect(screen.getByText(/Calculate/i)).toBeInTheDocument;
  });

  it('shows an error if no file is selected and calculate is clicked', () => {
    render(<UploadComponent setData={jest.fn()} />);
    fireEvent.click(screen.getByText(/Calculate/i));
    expect(screen.getByText(/Please upload a valid CSV file./i)).toBeInTheDocument;
  });

  it('shows an error "Error uploading CSV. Please try again." when API call fails', async () => {
    // Mocking a failed API call
    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    const file = new File(['test'], 'test.csv', { type: 'text/csv' });
    render(<UploadComponent setData={jest.fn()} />);

    // Simulating file selection
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Wait for potential state updates
    await waitFor(() => {
      if (!screen.queryByText('Selected File: test.csv')) {
        throw new Error('File not selected yet');
      }
    });

    // Clicking the calculate button to trigger the API call
    fireEvent.click(screen.getByText(/Calculate/i));

    // Wait for the error message to appear
    const errorMessage = await screen.findByText(/Error uploading CSV. Please try again./i);
    expect(errorMessage).toBeInTheDocument;
  });
});
