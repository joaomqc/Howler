import React from 'react';
import { render } from '@testing-library/react';
import ChatPage from 'app/ChatPage';

test('renders without crashing', () => {
  const app = render(<ChatPage />);
  app.unmount();
});
