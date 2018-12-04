import * as React from 'react';
import Checkbox from 'src/shared/Checkbox';
import Label from 'src/shared/Label';
import { FieldProps } from 'formik';
import { Box } from '@rebass/grid';

export interface ICheckboxProps {
    label: string;
}
const CheckboxComponent: React.StatelessComponent<ICheckboxProps & FieldProps> = (props) => {
    return (
        <Box mb={'26px'}>
            <Label fontWeight='normal'>
                <span>{props.label}</span>
                <Checkbox onChange={handleChange(props)} />
            </Label>
        </Box>
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
        const value = (event.target.value === 'on') ? true : false;
        form.setFieldValue(field.name, value);
    }
}

export default CheckboxComponent;
