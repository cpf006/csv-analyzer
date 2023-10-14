import { render } from '@testing-library/react';
import DisplayComponent from '../src/components/DisplayComponent';

describe('DisplayComponent', () => {
  it('renders the table with correct data', () => {
    const mockData = {
      column1: {
        missing_values: 0,
      },
      column2: {
        unique_values: 3,
      },
    };
    const { getByText } = render(<DisplayComponent data={mockData} />);
    expect(getByText(/Column1/i)).toBeInTheDocument;
    expect(getByText(/Unique Values/i)).toBeInTheDocument;
    expect(getByText(/Missing Values/i)).toBeInTheDocument;
    expect(getByText(/0/i)).toBeInTheDocument;
    expect(getByText(/3/i)).toBeInTheDocument;
  });
});
