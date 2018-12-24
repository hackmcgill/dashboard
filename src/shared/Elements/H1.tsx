import styled from '../Styles/styled-components';

interface IH1Props {
  color?: string;
  fontSize?: string;
  textAlign?: string;
  marginLeft?: string;
  marginTop?: string;
  marginBottom?: string;
}

export const H1 = styled.h1<IH1Props>`
  font-size: ${(props) => props.fontSize || '36px'};
  text-align: ${(props) => props.textAlign || 'left'};
  color: ${(props) => props.color || props.theme.colors.primary};
  margin-left: ${(props) => props.marginLeft || '18px'};
  margin-bottom: ${(props) => props.marginBottom || '18px'};
  margin-top: ${(props) => props.marginTop || 'initial'};
`;

export default H1;
