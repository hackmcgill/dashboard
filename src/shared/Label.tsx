import styled from 'styled-components';
import { ITheme } from 'src/theme';

interface ILabelProps {
  width?: string;
  fontWeight?: string;
  theme?: ITheme;
}

const Label = styled.label`
  span {
    margin-left: 10px;
  }
  font-weight: ${(props: ILabelProps) => props.fontWeight ? props.fontWeight : 'bold'};
  color: #4D4D4D;
  display: block;
  width: ${(props: ILabelProps) => props.width ? props.width : '100%'};
`

export default Label;
