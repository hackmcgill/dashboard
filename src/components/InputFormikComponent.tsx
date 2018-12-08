import * as React from 'react';
import Input from 'src/shared/Input';
import Label from 'src/shared/Label';
import { FieldProps } from 'formik';

export interface IInputFormikComponentProp {
    label: string;
    inputType: string;
    placeholder?: string;
    value?: string;
}
const InputFormikComponent: React.StatelessComponent<IInputFormikComponentProp & FieldProps> = (props) => {
    const placeholder = props.placeholder || '';
    return (
        <Label>
            <span>{props.label}</span>
            <Input type={props.inputType} onChange={handleChange(props)} placeholder={placeholder} value={props.value} />
        </Label>
    )
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the Link component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: IInputFormikComponentProp & FieldProps): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        const field = props.field;
        const form = props.form;
        form.setFieldValue(field.name, event.target.value);
    }
}

export default InputFormikComponent;
