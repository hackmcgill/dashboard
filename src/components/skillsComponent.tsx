import * as React from 'react';
import StyledCreatableSelect from 'src/shared/StyledCreatableSelect';
import Skills from 'src/config/skills';
import Label from 'src/shared/Label';
import { FieldProps } from 'formik';

/**
 * ISkillsComponent props
 */
export interface ISkillsComponentProps {
    label?: string
}

/**
 * SkillsComponent renders a dropdown for users to select their dietary restrictions, and
 * potentially create their own restrictions.
 */
const SkillsComponent: React.StatelessComponent<ISkillsComponentProps & FieldProps> = (props) => {
    const options: Array<{ label: string, value: string }> = [
        { label: Skills.HTML, value: Skills.HTML },
        { label: Skills.CSS, value: Skills.CSS },
        { label: Skills.JS, value: Skills.JS },
        { label: Skills.TS, value: Skills.TS },
    ]
    return (
        <Label>
            {props.label ? props.label : 'Skills'}
            <StyledCreatableSelect
                className='react-select-container'
                classNamePrefix='react-select'
                id='skills'
                isMulti={true}
                onChange={handleChange(props)}
                options={options}
            />
        </Label>
    );
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the Skills component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: FieldProps): (newValue: [{ label: string, value: string }]) => void {
    return (newValue: [{ label: string, value: string }]) => {
        const field = props.field;
        const form = props.form;
        const skills = newValue.map((value) => value.value);
        form.setFieldValue(field.name, skills);
    }
}

export default SkillsComponent;
