import * as React from 'react';
import { FieldProps } from 'formik';
import StylizedSelect from 'src/shared/StyledCreatableSelect';
import Genders from 'src/config/genders';
import Label from 'src/shared/Label';

export interface IGenderProps {
    label?: string
}

const GenderComponent: React.StatelessComponent<IGenderProps & FieldProps> = (props) => {
    const options: Array<{ label: string, value: string }> = [
        { label: Genders.MALE, value: Genders.MALE },
        { label: Genders.FEMALE, value: Genders.FEMALE },
        { label: Genders.PREFER_NOT_TO_SAY, value: Genders.PREFER_NOT_TO_SAY },
    ]
    return (
        <Label>
            {props.label ? props.label : 'What gender do you identify with?'}
            <StylizedSelect
                className='react-select-container'
                classNamePrefix='react-select'
                id='gender-component'
                onChange={handleChange(props)}
                options={options}
            />
        </Label>
    );
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the GenderComponent component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: FieldProps): (newValue: { label: string, value: string }) => void {
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

export default GenderComponent;