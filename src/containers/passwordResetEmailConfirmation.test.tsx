import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PasswordResetContainer from './passwordResetEmailConfirmation';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PasswordResetContainer />, div);
    ReactDOM.unmountComponentAtNode(div);
});