import styled from 'styled-components'
import { Box } from '@rebass/grid'


interface IMaxWidthBoxProps {
    maxWidth?: string;
    textAlign?: string;
    marginBottom?: string;
}

const MaxWidthBox = styled(Box)`
    max-width: ${(props: IMaxWidthBoxProps) => props.maxWidth ? props.maxWidth : '600px'};
    text-align: ${(props: IMaxWidthBoxProps) => props.textAlign ? props.textAlign : ''};
    margin-bottom: ${props => props.marginBottom || props.mb ? props.marginBottom || props.mb : '20px'};
`;

export default MaxWidthBox;
