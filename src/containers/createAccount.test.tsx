import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CreateAccountContainer from './createAccount';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateAccountContainer />, div);
    ReactDOM.unmountComponentAtNode(div);
});
