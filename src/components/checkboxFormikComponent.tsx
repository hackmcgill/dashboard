import * as React from 'react';
import { Checkbox, Label, FormDescription } from 'src/shared';
import { FieldProps } from 'formik';
import LabelTextComponent from './LabelTextComponent';
import { Box } from '@rebass/grid';

export interface ICheckboxProps {
    label: string | React.Component;
    value?: boolean;
    required?: boolean;
    isTight?: boolean;
    subtitle?: string;
}
const CheckboxComponent: React.StatelessComponent<ICheckboxProps & FieldProps> = (props) => {
    const { isTight, subtitle } = props;
    const label = (typeof props.label === 'string') ? (<span>{props.label}</span>) : props.label;
    return (
        <Box mb={isTight ? 0 : '20px'}>
            <Label fontWeight='normal'>
                <LabelTextComponent label={label} required={props.required} />
                <Checkbox onChange={handleChange(props)} checked={props.value} />
            </Label>
            <FormDescription>
                {subtitle}
            </FormDescription>
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
        form.setFieldValue(field.name, event.target.checked);
    }
}

export default CheckboxComponent;
