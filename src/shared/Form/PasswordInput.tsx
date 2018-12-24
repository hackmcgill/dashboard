import * as React from 'react';
import { Input, Label, LabelText } from './';

interface IPasswordInputProp {
  onPasswordChanged: (email: string) => void;
  label?: string;
  required?: boolean;
  id?: string;
  isTight?: boolean;
  value?: string;
}
export const PasswordInput: React.StatelessComponent<IPasswordInputProp> = (
  props
) => {
  return (
    <Label>
      <LabelText label={props.label} required={props.required} />
      <Input
        type="password"
        onChange={handleChange(props)}
        id={props.id}
        isTight={props.isTight}
        value={props.value}
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
