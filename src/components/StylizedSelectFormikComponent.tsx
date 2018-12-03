import * as React from 'react';
import { FieldProps } from 'formik';
import StylizedSelect from 'src/shared/StyledCreatableSelect';
// import Genders from 'src/config/genders';
import Label from 'src/shared/Label';

export interface IStylizedSelectFormikProps {
    selectId: string;
    label: string
    options: Array<{ label: string, value: string }>
    isMulti: boolean;
    placeholder?: string;
}

const StylizedSelectFormikComponent: React.StatelessComponent<IStylizedSelectFormikProps & FieldProps> = (props) => {
    const handleChange = (props.isMulti) ? handleChangeMulti : handleChangeSingle;
    return (
        <Label>
            {props.label}
            <StylizedSelect
                className='react-select-container'
                classNamePrefix='react-select'
                id={props.selectId}
                onChange={handleChange(props)}
                options={props.options}
                isMulti={props.isMulti}
                placeholder={props.placeholder ? props.placeholder : 'Select...'}
            />
        </Label>
    );
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChangeSingle(props: IStylizedSelectFormikProps & FieldProps): (newValue: { label: string, value: string }) => void {
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
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChangeMulti(props: IStylizedSelectFormikProps & FieldProps): (newValue: [{ label: string, value: string }]) => void {
    return (newValue: [{ label: string, value: string }]) => {
        const field = props.field;
        const form = props.form;
        const skills = newValue.map((value) => value.value);
        form.setFieldValue(field.name, skills);
    }
}

export default StylizedSelectFormikComponent;