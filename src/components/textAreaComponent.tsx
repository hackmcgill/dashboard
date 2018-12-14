import * as React from 'react';
import Label from '../shared/Label';

import { FieldProps } from 'formik';
import Textarea from '../shared/Textarea';
import LabelTextComponent from './LabelTextComponent';

export interface ITextAreaProp {
    label: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    maxLength?: number;
}
const TextareaComponent: React.StatelessComponent<ITextAreaProp & FieldProps> = (props) => {
    const placeholder = (props.placeholder) ? props.placeholder : '';
    const charLeft = (props.maxLength && props.value) ? `${props.value.length}/${props.maxLength} chararacters` : '';
    return (
        <Label>
            <LabelTextComponent label={props.label} required={props.required} />
            <span>{charLeft}</span>
            <Textarea onChange={handleChange(props)} placeholder={placeholder} value={props.value} maxLength={props.maxLength} />
        </Label>
    )
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the Textarea component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: ITextAreaProp & FieldProps): (event: React.ChangeEvent<HTMLTextAreaElement>) => void {
    return (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const field = props.field;
        const form = props.form;
        form.setFieldValue(field.name, event.target.value);
    };
}



export default TextareaComponent;
