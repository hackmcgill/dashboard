import styled from 'styled-components';

interface IH2Props {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  marginLeft?: string;
  marginTop?: string;
  marginBottom?: string;
  display?: string;
}

export const H2 = styled.h2<IH2Props>`
  font-size: ${(props) => props.fontSize || '24px'};
  text-align: ${(props) => props.textAlign || 'left'};
  color: ${(props) => props.color || props.theme.colors.red};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  margin-left: ${(props) => props.marginLeft || 'initial'};
  margin-bottom: ${(props) => props.marginBottom || '12px'};
  margin-top: ${(props) => props.marginTop || 'initial'};
  display: ${(props) => props.display || ''};
`;

export default H2;
