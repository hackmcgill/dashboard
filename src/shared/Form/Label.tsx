import styled from '../Styles/styled-components';

interface ILabelProps {
  width?: string;
  fontWeight?: string;
}

export const Label = styled.label<ILabelProps>`
  font-weight: ${(props) => props.fontWeight || 'bold'};
  color: ${(props) => props.theme.colors.greyDark};
  display: block;
  width: ${(props) => props.width || '100%'};
`;

export default Label;
