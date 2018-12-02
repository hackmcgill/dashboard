import styled from 'styled-components'
import { Box } from '@rebass/grid'


interface IMaxWidthBoxProps {
    maxWidth?: string;
}

const MaxWidthBox = styled(Box)`
    max-width: ${(props: IMaxWidthBoxProps) => props.maxWidth ? props.maxWidth : '600px'};
`;

export default MaxWidthBox;
