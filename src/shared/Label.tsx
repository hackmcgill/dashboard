import styled from 'styled-components';
import { ITheme } from 'src/theme';

interface ILabelInput {
  marginLeft?: string;
  width?: string;
  fontWeight?: string;
  theme?: ITheme;
}

const Label = styled.label`
  margin-left: ${(props: ILabelProps) => props.marginLeft ? props.marginLeft : '12%'};
  font-weight: ${(props: ILabelProps) => props.fontWeight ? props.fontWeight : 'bold'};
  color: #4D4D4D;
  width: ${(props: ILabelInput) => props.width ? props.width : '100%'};
`

export default Label;
