import styled from '../Styles/styled-components';

interface IH2Props {
  color?: string;
  fontSize?: string;
  textAlign?: string;
  marginLeft?: string;
  marginTop?: string;
  marginBottom?: string;
}

export const H2 = styled.h2<IH2Props>`
  font-size: ${(props) => props.fontSize || '24px'};
  text-align: ${(props) => props.textAlign || 'left'};
  color: ${(props) => props.color || props.theme.colors.primary};
  margin-left: ${(props) => props.marginLeft || 'initial'};
  margin-bottom: ${(props) => props.marginBottom || '12px'};
  margin-top: ${(props) => props.marginTop || 'initial'};
`;

export default H2;
