import * as React from 'react';
import Label from 'src/shared/Label';

import { FieldProps } from 'formik';
import Textarea from 'src/shared/Textarea';
import DebouncedUpdate from 'src/shared/DebouncedUpdate';
export interface ITextAreaProp {
    label: string;
    placeholder?: string;
}
const TextareaComponent: React.StatelessComponent<ITextAreaProp & FieldProps> = (props) => {
    const placeholder = (props.placeholder) ? props.placeholder : '';
    return (
        <Label>
            <span>{props.label}</span>
            <Textarea onChange={handleChange(props)} placeholder={placeholder} />
        </Label>
    )
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the Textarea component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: ITextAreaProp & FieldProps): (event: React.ChangeEvent<HTMLTextAreaElement>) => void {
    const debouncedUpdater = DebouncedUpdate(props, 150);
    return (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        debouncedUpdater(event.target.value);
    };
}



export default TextareaComponent;
