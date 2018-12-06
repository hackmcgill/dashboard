import { css } from 'styled-components';
import { ITheme } from 'src/theme';

export interface IInputProps {
  isTight?: boolean;
  fontWeight?: string;
  theme?: ITheme;
}

const inputStyles = css`
  border-radius: 20px;
  border: 2px solid ${(props: IInputProps) => props.theme ? props.theme.greyLight : 'grey'};
  font-weight: ${props => props.fontWeight || 'normal'}
  box-sizing: border-box;
  display: block;
  font-size: 16px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: ${(props: IInputProps) => (props.isTight) ? '8px' : '20px'};
  min-height: 35px;
  padding-left: 16px;
  width: 100%;
  transition: 0.25s border ease-in;
  font-family: ${props => props.theme.fontFamily};

  &:focus,&:hover {
    border: 2px solid ${(props: IInputProps) => props.theme ? props.theme.grey : 'grey'};
  }
`

export default inputStyles;
