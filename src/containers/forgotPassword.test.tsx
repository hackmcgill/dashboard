import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ForgotPasswordContainer from './forgotPassword';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ForgotPasswordContainer />, div);
    ReactDOM.unmountComponentAtNode(div);
});
