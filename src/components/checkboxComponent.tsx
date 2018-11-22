import * as React from 'react';
import Input from 'src/shared/Input';
import Label from 'src/shared/Label';
import { FieldProps } from 'formik';

export interface ICheckboxProps {
    label: string;
}
const CheckboxComponent: React.StatelessComponent<ICheckboxProps & FieldProps> = (props) => {
    return (
        <Label>
            {props.label}
            <Input type='checkbox' onChange={handleChange(props)} />
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
        form.setFieldValue(field.name, event.target.value);
    }
}

export default CheckboxComponent;
