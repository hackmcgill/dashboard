import * as React from 'react';
import Input from 'src/shared/Input';
import Label from 'src/shared/Label';

interface IEmailInputProp {
    onEmailChanged: (email: string) => void;
}
const EmailInput: React.StatelessComponent<IEmailInputProp> = (props) => {
    return (
        <Label>
            Email:
            <Input type='email' onChange={handleChange(props)} />
        </Label>
    )
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the EmailInput component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: IEmailInputProp): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => props.onEmailChanged(event.target.value);
}

export default EmailInput;
