
import * as React from 'react';
import { REQUIRED_INPUT } from 'src/config';
import { RequiredInputLabel } from 'src/shared';

export interface ILabelTextProps {
    label: any;
    required?: boolean;
}
const LabelTextComponent: React.StatelessComponent<ILabelTextProps> = (props: ILabelTextProps) => {
    const requiredText = <RequiredInputLabel>{props.required ? REQUIRED_INPUT : ''}</RequiredInputLabel>
    return (
        <span>
            {props.label}
            {requiredText}
        </span>
    )
}

export default LabelTextComponent;