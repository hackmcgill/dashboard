import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ConfirmAccount from './confirmAccount';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ConfirmAccount />, div);
    ReactDOM.unmountComponentAtNode(div);
});
