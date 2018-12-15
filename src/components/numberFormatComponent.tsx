import * as React from 'react';
import { NumberFormatProps, NumberFormatValues } from 'react-number-format';

import { Label, StyledNumberFormat } from '../shared';
import LabelTextComponent from './LabelTextComponent';

interface ILabelledNumberFormatProp {
  value?: string;
  onValueChange: (value: NumberFormatValues) => void;
  label: string;
  placeholder: string;
  required?: boolean;
}
const LabelledNumberFormat: React.StatelessComponent<
  ILabelledNumberFormatProp & NumberFormatProps
> = (props) => {
  return (
    <Label>
      <LabelTextComponent label={props.label} required={props.required} />
      <StyledNumberFormat {...props} />
    </Label>
  );
};
export default LabelledNumberFormat;
