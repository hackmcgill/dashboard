
import { REQUIRED_INPUT } from 'src/config/constants';
import * as React from 'react';

export interface ILabelTextProps {
    label: any;
    required?: boolean;
}
const LabelTextComponent: React.StatelessComponent<ILabelTextProps> = (props: ILabelTextProps) => {
    const requiredText = <span style={{ fontWeight: 'lighter', color: 'red', marginLeft: '1px' }}>{props.required ? REQUIRED_INPUT : ''}</span>
    return (
        <span>{props.label}{requiredText}</span>
    )
}

export default LabelTextComponent;