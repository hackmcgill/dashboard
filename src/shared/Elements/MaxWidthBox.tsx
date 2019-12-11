import { Box } from '@rebass/grid';
import styled from '../Styles/styled-components';

export interface IMaxWidthBoxProps {
  maxWidth?: string;
  textAlign?: string;
  paddingLeft?: string;
}

export const MaxWidthBox = styled(Box)<IMaxWidthBoxProps>`
  max-width: ${(props) => props.maxWidth || '600px'};
  text-align: ${(props) => props.textAlign || 'initial'};
  padding-left: ${(props) => props.paddingLeft || '0'};
`;

export default MaxWidthBox;
