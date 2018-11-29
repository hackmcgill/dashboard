import * as React from 'react';
import { FieldProps } from 'formik';
import StyledCreatableSelect from 'src/shared/StyledCreatableSelect';
import Ethnicity from 'src/config/ethnicity';
import Label from 'src/shared/Label';

export interface IEthnicityProps {
    label?: string
}

const EthnicityComponent: React.StatelessComponent<IEthnicityProps & FieldProps> = (props) => {
    const options: Array<{ label: string, value: string }> = [
        { label: Ethnicity.AFRO_AMER, value: Ethnicity.AFRO_AMER },
        { label: Ethnicity.ASIAN_PI, value: Ethnicity.ASIAN_PI },
        { label: Ethnicity.EUROPEAN, value: Ethnicity.EUROPEAN },
        { label: Ethnicity.HISP, value: Ethnicity.HISP },
        { label: Ethnicity.NO_ANS, value: Ethnicity.NO_ANS },
    ]
    return (
        <Label>
            {props.label ? props.label : 'What Ethnicity do you identify with?'}
            <StyledCreatableSelect
                className='react-select-container'
                classNamePrefix='react-select'
                id='Ethnicity-component'
                isMulti={true}
                onChange={handleChange(props)}
                options={options}
            />
        </Label>
    );
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the EthnicityComponent component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: FieldProps): (newValue: [{ label: string, value: string }]) => void {
    return (newValue: [{ label: string, value: string }]) => {
        const field = props.field;
        const form = props.form;
        const values = newValue.map<string>((option) => option.value);
        form.setFieldValue(field.name, values);
    }
}

export default EthnicityComponent;