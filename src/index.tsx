import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
Sentry.init({
  dsn:
    'https://26f1d8550cc34833b9e04894a8192611@o659380.ingest.sentry.io/5764002',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
unregister();
