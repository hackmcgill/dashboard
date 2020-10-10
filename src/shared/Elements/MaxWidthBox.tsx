import { Box } from '@rebass/grid';
import styled from '../Styles/styled-components';

export interface IMaxWidthBoxProps {
  maxWidth?: string;
  textAlign?: string;
  paddingLeft?: string;
  paddingRight?: string;
  float?: string;
  minWidth?: string;
  left?: string;
  position?: string;
}

export const MaxWidthBox = styled(Box)<IMaxWidthBoxProps>`
  min-width: ${(props) => props.minWidth || '400px'}
  max-width: ${(props) => props.maxWidth || '600px'};
  text-align: ${(props) => props.textAlign || 'initial'};
  padding-left: ${(props) => props.paddingLeft || '0'};
  padding-right: ${(props) => props.paddingRight || '0'};
  float: ${(props) => props.float || 'none'};
  left: ${(props) => props.left || '0'};
  position: ${(props) => props.position || 'static'};
`;

export default MaxWidthBox;
