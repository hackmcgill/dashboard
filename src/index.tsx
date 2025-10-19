import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { unregister } from './registerServiceWorker';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
unregister();
