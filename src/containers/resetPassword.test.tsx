import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ResetPasswordContainer from './resetPassword';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResetPasswordContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
