import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
unregister();
