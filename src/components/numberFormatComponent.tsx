
import * as React from 'react';
import Label from '../shared/Label';
import NumberFormat from '../shared/StyledNumberFormat';
import { NumberFormatValues, NumberFormatProps } from 'react-number-format';
import LabelTextComponent from './LabelTextComponent';

interface ILabelledNumberFormatProp {
    value?: string;
    onValueChange: (value: NumberFormatValues) => void;
    label: string;
    placeholder: string;
    required?: boolean;
}
const LabelledNumberFormat: React.StatelessComponent<ILabelledNumberFormatProp & NumberFormatProps> = (props) => {
    return (
        <Label>
            <LabelTextComponent label={props.label} required={props.required} />
            <NumberFormat
                {...props}
            />
        </Label>
    )
}
export default LabelledNumberFormat;
