import * as React from 'react';
import Input from 'src/shared/Input';
import Label from 'src/shared/Label';
import { FieldProps } from 'formik';

export interface ILinkComponentProp {
    label: string;
    placeholder?: string;
}
const LinkComponent: React.StatelessComponent<ILinkComponentProp & FieldProps> = (props) => {
    const placeholder = (props.placeholder) ? props.placeholder : '';
    return (
        <Label>
            {props.label}:
            <Input type='url' onChange={handleChange(props)} placeholder={placeholder} />
        </Label>
    )
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the Link component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: ILinkComponentProp & FieldProps): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        const field = props.field;
        const form = props.form;
        form.setFieldValue(field.name, event.target.value);
    }
}

export default LinkComponent;
