import * as React from 'react';
import { Input, Label } from '../shared';

import { FieldProps } from 'formik';
import LabelTextComponent from './LabelTextComponent';

export interface IInputFormikComponentProp {
    label: string;
    inputType: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
}
const InputFormikComponent: React.StatelessComponent<IInputFormikComponentProp & FieldProps> = (props) => {
    const placeholder = props.placeholder || '';
    return (
        <Label>
            <LabelTextComponent label={props.label} required={props.required} />
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
