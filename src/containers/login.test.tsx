import * as React from 'react';
import * as ReactDOM from 'react-dom';
import LoginComponent from './login';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
});
