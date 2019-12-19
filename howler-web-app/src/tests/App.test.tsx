import React from 'react';
import { render } from '@testing-library/react';
import App from 'app/App';

test('renders without crashing', () => {
  const app = render(<App />);
  app.unmount();
});
