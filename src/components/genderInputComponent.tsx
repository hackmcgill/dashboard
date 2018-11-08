import * as React from 'react';
import Select from 'react-select';
import Genders from 'src/shared/genders';
import { FieldProps } from 'formik';

const GenderComponent: React.StatelessComponent<FieldProps> = (props) => {
    const options: Array<{ label: string, value: string }> = [
        { label: Genders.male, value: Genders.male },
        { label: Genders.female, value: Genders.female },
        { label: Genders.preferNotToSay, value: Genders.preferNotToSay },
    ]
    return (
        <Select
            onChange={handleChange(props)}
            options={options}
        />
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