import * as React from 'react';
import Input from 'src/shared/Input';
import Label from 'src/shared/Label';
import LabelTextComponent from './LabelTextComponent';

interface IPronounInputProp {
    value?: string;
    onPronounChanged: (email: string) => void;
    label?: string;
    required?: boolean;
    placeholder: string;
}
const PronounInput: React.StatelessComponent<IPronounInputProp> = (props) => {
    return (
        <Label>
            <LabelTextComponent label={props.label} required={props.required} />
            <Input type='text' onChange={handleChange(props)} placeholder={props.placeholder} value={props.value} />
        </Label>
    )
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the pronoun component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: IPronounInputProp): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => props.onPronounChanged(event.target.value);
}

export default PronounInput;
