import * as React from 'react';
import Input from 'src/shared/Input';
import Label from 'src/shared/Label';
import LabelTextComponent from './LabelTextComponent';

interface IEmailInputProp {
    onEmailChanged: (email: string) => void;
    disabled?: boolean;
    value?: string;
    placeholder?: string;
    isTight?: boolean;
    label: string;
    required?: boolean;
}
const EmailInput: React.StatelessComponent<IEmailInputProp> = (props: IEmailInputProp) => {
    const placeholder = (props.placeholder) ? props.placeholder : "";
    return (
        <Label>
            <LabelTextComponent label={props.label} required={props.required} />
            <Input type='email' onChange={handleChange(props)} placeholder={placeholder} isTight={props.isTight} value={props.value} disabled={props.disabled} />
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
