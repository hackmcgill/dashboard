import styled from '../Styles/styled-components';

interface IH1Props {
  color?: string;
  fontSize?: string;
  textAlign?: string;
  marginLeft?: string;
  marginTop?: string;
  marginBottom?: string;
  display?: string;
  fontWeight?: string;
  paddingTop?: string;
  paddingBottom?: string;
}

export const H1 = styled.h1<IH1Props>`
  font-size: ${(props) => props.fontSize || '36px'};
  text-align: ${(props) => props.textAlign || 'left'};
  color: ${(props) => props.color || props.theme.colors.red};
  margin-left: ${(props) => props.marginLeft || '18px'};
  margin-bottom: ${(props) => props.marginBottom || '18px'};
  margin-top: ${(props) => props.marginTop || 'initial'};
  display: ${(props) => props.display || ''};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  padding-top: ${(props) => props.paddingTop || '0'};
  padding-bottom: ${(props) => props.paddingBottom || '0'};
`;

export default H1;
