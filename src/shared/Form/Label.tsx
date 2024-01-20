import styled from 'styled-components';

interface ILabelProps {
  width?: string;
  fontWeight?: string;
}

export const Label = styled.label<ILabelProps>`
  font-family: ${(props) => props.theme.fonts.header};
  font-weight: ${(props) => props.fontWeight || '400'};
  color: ${(props) => props.theme.colors.black80};
  display: block;
  width: ${(props) => props.width || '100%'};

  p {
    font-size: 14px;
    color: ${(props) => props.theme.colors.black60};
  }
`;

export default Label;
