import * as React from 'react';
import Input from 'src/shared/Input';
import Label from 'src/shared/Label';

interface IPasswordInputProp {
    onPasswordChanged: (email: string) => void;
    label?: string;
}
const PasswordInput: React.StatelessComponent<IPasswordInputProp> = (props) => {
    return (
        <Label>
            {props.label ? props.label : 'Password'}:
            <Input type='password' onChange={handleChange(props)} />
        </Label>
    )
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the PasswordInput component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: IPasswordInputProp): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => props.onPasswordChanged(event.target.value);
}

export default PasswordInput;
