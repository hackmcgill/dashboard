import * as React from 'react';
import StyledSelect from '../shared/StyledSelect';
import jobInterests from '../config/jobInterests';
import Label from 'src/shared/Label';
import { FieldProps } from 'formik';

interface IJobInterestProps {
    label: string;
    placeholder: string;
}

const jobInterestComponent: React.StatelessComponent<IJobInterestProps & FieldProps> = (props) => {
    const options: Array<{ label: string, value: string }> = [
        { label: jobInterests.NONE, value: jobInterests.NONE },
        { label: jobInterests.INTERNSHIP, value: jobInterests.INTERNSHIP },
        { label: jobInterests.FULL_TIME, value: jobInterests.FULL_TIME },
    ]
    return (
        <Label>
            {props.label}
            <StyledSelect
                className='react-select-container'
                classNamePrefix='react-select'
                onChange={handleChange(props)}
                options={options}
                placeholder={props.placeholder}
            />
        </Label>
    );
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the GenderComponent component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: IJobInterestProps & FieldProps): (newValue: { label: string, value: string }) => void {
    return (newValue: { label: string, value: string }) => {
        const field = props.field;
        const form = props.form;
        if (newValue && newValue.value) {
            form.setFieldValue(field.name, newValue.value);
        } else {
            form.setFieldValue(field.name, '');
        }
    }
}


export default jobInterestComponent;