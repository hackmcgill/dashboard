import React from 'react';
import { FieldProps } from 'formik';
import { Input, Label, LabelText } from '..';

interface IInputFormikComponentProp {
  label: string;
  inputType: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  showOptionalLabel?: boolean;
}
const InputFormikComponent: React.FC<
  IInputFormikComponentProp & FieldProps
> = ({ placeholder, label, required, inputType, field, disabled, showOptionalLabel }) => {
  return (
    <Label>
      <LabelText label={label} required={required} showOptionalLabel={showOptionalLabel} />
      <Input
        type={inputType}
        placeholder={placeholder || ''}
        disabled={disabled}
        {...field}
      />
    </Label>
  );
};

export { InputFormikComponent as Input };
