
import { REQUIRED_INPUT, OPTIONAL_INPUT } from 'src/config/constants';
import * as React from 'react';

export interface ILabelTextProps {
    label: any;
    required?: boolean;
}
const LabelTextComponent: React.StatelessComponent<ILabelTextProps> = (props: ILabelTextProps) => {
    return (
        <span>{props.required ? REQUIRED_INPUT : OPTIONAL_INPUT}</span>
    )
}

export default LabelTextComponent;