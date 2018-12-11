import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PasswordResetEmailConfirmationContainer from './passwordResetEmailConfirmation';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PasswordResetEmailConfirmationContainer />, div);
    ReactDOM.unmountComponentAtNode(div);
});