
import * as React from 'react';
import Label from 'src/shared/Label';
import NumberFormat from 'src/shared/StyledNumberFormat';
import { NumberFormatValues, NumberFormatProps } from 'react-number-format';

interface ILabelledNumberFormatProp {
    onValueChange: (value: NumberFormatValues) => void;
    label: string;
    placeholder: string;
}
const LabelledNumberFormat: React.StatelessComponent<ILabelledNumberFormatProp & NumberFormatProps> = (props) => {
    return (
        <Label>
            <span>{props.label}</span>
            <NumberFormat
                {...props}
            />
        </Label>
    )
}
export default LabelledNumberFormat;
