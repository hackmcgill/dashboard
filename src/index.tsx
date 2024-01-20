import { BrowserTracing } from '@sentry/browser';
import * as Sentry from '@sentry/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SENTRY_DSN } from './config';
import { unregister } from './registerServiceWorker';
Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
unregister();
