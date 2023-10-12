import { render } from '@testing-library/react';
import UploadComponent from '../src/components/UploadComponent';

test('renders upload button', () => {
  const { getByText } = render(<UploadComponent />);
  const uploadButton = getByText(/Upload CSV/i);
  expect(uploadButton).toBeInTheDocument();
});