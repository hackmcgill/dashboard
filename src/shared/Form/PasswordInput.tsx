import React from 'react';
import ForgotPasswordLinkComponent from '../../features/Login/ForgotPasswordLink';
import { Input, Label, LabelText } from './';

interface IPasswordInputProp {
  onPasswordChanged: (email: string) => void;
  label?: string;
  required?: boolean;
  id?: string;
  isTight?: boolean;
  value?: string;
  placeholder?: string;
  hasResetLink?: boolean;
}

/**
 * A password field in the form
 * @prop {boolean} hasResetLink should a reset password link be displayed
 */
export const PasswordInput: React.FC<IPasswordInputProp> = (
  props
) => {
  const placeholder = props.placeholder ? props.placeholder : '';
  return (
    <Label>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <LabelText label={props.label} required={props.required} />
        {
          props.hasResetLink && <ForgotPasswordLinkComponent />
        }
      </div>

      <Input
        type="password"
        onChange={handleChange(props)}
        id={props.id}
        isTight={props.isTight}
        value={props.value}
        placeholder={placeholder}
      />
    </Label>
  );
};
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the PasswordInput component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(
  props: IPasswordInputProp
): (event: React.ChangeEvent<HTMLInputElement>) => void {
  return (event: React.ChangeEvent<HTMLInputElement>) =>
    props.onPasswordChanged(event.target.value);
}
