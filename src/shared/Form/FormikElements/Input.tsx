import { FieldProps } from 'formik';
import * as React from 'react';
import { Input, Label, LabelText } from '..';

interface IInputFormikComponentProp {
  label: string;
  inputType: string;
  placeholder?: string;
  required?: boolean;
  isDisabled?: boolean;
}
const InputFormikComponent: React.StatelessComponent<
  IInputFormikComponentProp & FieldProps
> = ({ placeholder, label, required, inputType, field, isDisabled }) => {
  return (
    <Label>
      <LabelText label={label} required={required} />
      <Input
        type={inputType}
        placeholder={placeholder || ''}
        disabled={isDisabled}
        {...field}
      />
    </Label>
  );
};

export { InputFormikComponent as Input };
