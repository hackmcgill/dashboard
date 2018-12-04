import * as React from 'react';
import Input from 'src/shared/Input';
import Label from 'src/shared/Label';
import { FieldProps } from 'formik';
import DebouncedUpdate from 'src/shared/DebouncedUpdate';

export interface IInputFormikComponentProp {
    label: string;
    inputType: string;
    placeholder?: string;
}
const InputFormikComponent: React.StatelessComponent<IInputFormikComponentProp & FieldProps> = (props) => {
    const placeholder = props.placeholder || '';
    return (
        <Label>
            <span>{props.label}</span>
            <Input type={props.inputType} onChange={handleChange(props)} placeholder={placeholder} />
        </Label>
    )
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the Link component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: IInputFormikComponentProp & FieldProps): (event: React.ChangeEvent<HTMLInputElement>) => void {
    const debouncedUpdater = DebouncedUpdate(props, 150);
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedUpdater(event.target.value);
    }
}

export default InputFormikComponent;
