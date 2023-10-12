import { render } from '@testing-library/react';
import DisplayComponent from '../src/components/DisplayComponent';

test('renders table when data is provided', () => {
  const dummyData = {}; // Placeholder for test data
  const { getByRole } = render(<DisplayComponent data={dummyData} />);
  const table = getByRole('table');
  expect(table).toBeInTheDocument();
});