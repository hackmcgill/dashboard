
import * as React from 'react';
import Label from 'src/shared/Label';
import NumberFormat from 'src/shared/NumberFormat';
import { NumberFormatValues, NumberFormatProps } from 'react-number-format';

interface ILabelledNumberFormatProp {
    onValueChange: (value: NumberFormatValues) => void;
    label: string;
    placeholder: string;
}
const LabelledNumberFormat: React.StatelessComponent<ILabelledNumberFormatProp & NumberFormatProps> = (props) => {
    return (
        <Label>
            {props.label}
            <NumberFormat
                {...props}
            />
        </Label>
    )
}
export default LabelledNumberFormat;
