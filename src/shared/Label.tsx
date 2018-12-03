import styled from 'styled-components';
import { ITheme } from 'src/theme';

interface ILabelProps {
  fontWeight?: string;
  theme?: ITheme
}

const Label = styled.label`
  margin-left: 12%;
  font-weight: ${(props: ILabelProps) => props.fontWeight ? props.fontWeight : 'bold'};
  color: #4D4D4D;
`

export default Label;
