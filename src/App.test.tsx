import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

it('renders without crashing', () => {
  const div = ReactDOM.createRoot(document.createElement('div'));
  div.render(<App />);
  div.unmount();
});
