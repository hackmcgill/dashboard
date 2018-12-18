import * as React from 'react';
import { NumberFormatProps, NumberFormatValues } from 'react-number-format';
import { Label, LabelText, StyledNumberFormat } from '.';

interface ILabelledNumberFormatProp {
  value?: string;
  onValueChange: (value: NumberFormatValues) => void;
  label: string;
  placeholder: string;
  required?: boolean;
}
export const NumberFormatInput: React.StatelessComponent<
  ILabelledNumberFormatProp & NumberFormatProps
> = (props) => {
  return (
    <Label>
      <LabelText label={props.label} required={props.required} />
      <StyledNumberFormat {...props} />
    </Label>
  );
};
