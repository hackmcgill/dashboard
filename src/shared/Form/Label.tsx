import styled from '../Styles/styled-components';

interface ILabelProps {
  width?: string;
  fontWeight?: string;
}

export const Label = styled.label<ILabelProps>`
  font-family: ${(props) => props.theme.fonts.header};
  font-weight: ${(props) => props.fontWeight || 'bold'};
  color: ${(props) => props.theme.colors.black80};
  display: block;
  width: ${(props) => props.width || '100%'};
`;

export default Label;
