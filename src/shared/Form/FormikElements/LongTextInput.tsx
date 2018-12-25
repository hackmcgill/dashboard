import { FieldProps } from 'formik';
import * as React from 'react';
import { Label, LabelText } from '../';
import { Textarea } from '../../Elements';

export interface ITextAreaProp {
  label: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  maxLength?: number;
}

export const LongTextInput: React.StatelessComponent<
  ITextAreaProp & FieldProps
> = (props) => {
  const placeholder = props.placeholder ? props.placeholder : '';
  const charLeft =
    props.maxLength && props.value
      ? `${props.value.length}/${props.maxLength} characters`
      : '';
  return (
    <Label>
      <LabelText
        label={props.label}
        required={props.required}
        secondaryInfo={charLeft}
      />
      <Textarea
        onChange={handleChange(props)}
        placeholder={placeholder}
        value={props.value}
        maxLength={props.maxLength}
      />
    </Label>
  );
};
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the Textarea component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(
  props: ITextAreaProp & FieldProps
): (event: React.ChangeEvent<HTMLTextAreaElement>) => void {
  return (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const field = props.field;
    const form = props.form;
    form.setFieldValue(field.name, event.target.value);
  };
}
