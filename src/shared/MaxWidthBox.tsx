import styled from './styled-components'
import { Box } from '@rebass/grid'

export interface IMaxWidthBoxProps {
    maxWidth?: string;
    textAlign?: string;
}

export const MaxWidthBox = styled(Box) <IMaxWidthBoxProps>`
    max-width: ${props => props.maxWidth || '600px'};
    text-align: ${props => props.textAlign || 'initial'};
`;

export default MaxWidthBox;
