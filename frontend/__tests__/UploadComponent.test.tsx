import { render, screen, fireEvent } from '@testing-library/react';
import UploadComponent from '../src/components/UploadComponent';

describe('UploadComponent', () => {
  it('renders the drag-and-drop area', () => {
    render(<UploadComponent setData={jest.fn()} />);
    expect(screen.getByText(/Drag & drop a CSV file here, or click to select one/i)).toBeInTheDocument;
  });
});