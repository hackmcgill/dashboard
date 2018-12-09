import * as React from 'react';
import Checkbox from 'src/shared/Checkbox';
import Label from 'src/shared/Label';
import { FieldProps } from 'formik';

export interface ICheckboxProps {
    label: string | React.Component;
    value?: boolean;
}
const CheckboxComponent: React.StatelessComponent<ICheckboxProps & FieldProps> = (props) => {
    const label = (typeof props.label === 'string') ? (<span>props.label</span>) : props.label;
    return (
        <Label fontWeight='normal'>
            {label}
            <Checkbox onChange={handleChange(props)} checked={props.value} />
        </Label>
    )
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the checkbox component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: ICheckboxProps & FieldProps): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        const field = props.field;
        const form = props.form;
        form.setFieldValue(field.name, event.target.checked);
    }
}

export default CheckboxComponent;
