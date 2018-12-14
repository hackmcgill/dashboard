
import { REQUIRED_INPUT } from '../config/constants';
import * as React from 'react';
import RequiredInputLabel from '../shared/RequiredInputLabel';
import { Flex, Box } from '@rebass/grid';
import SecondaryInfoText from '../shared/SecondaryInfoText';

export interface ILabelTextProps {
    label: any;
    required?: boolean;
    secondaryInfo?: any;
}
const LabelTextComponent: React.StatelessComponent<ILabelTextProps> = (props: ILabelTextProps) => {
    const requiredText = <RequiredInputLabel>{props.required ? REQUIRED_INPUT : ''}</RequiredInputLabel>
    const secondaryInfo = <SecondaryInfoText>{props.secondaryInfo || ''}</SecondaryInfoText>
    return (
        <Flex flexDirection={'row'} justifyContent={'space-between'}>
            <Box ml='10px'>
                {props.label}
                {requiredText}
            </Box>
            <Box mr='10px'>
                {secondaryInfo}
            </Box>
        </Flex>
    )
}

export default LabelTextComponent;
