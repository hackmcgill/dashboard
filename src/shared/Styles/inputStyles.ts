import { css } from './styled-components';

export interface IInputProps {
  isTight?: boolean;
  fontWeight?: string;
}

export const inputStyles = css<IInputProps>`
  border-radius: 20px;
  border: 2px solid ${(props) => props.theme.colors.greyLight};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  box-sizing: border-box;
  display: block;
  font-size: 16px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: ${(props) => (props.isTight ? '8px' : '20px')};
  min-height: 42px;
  padding-left: 16px;
  width: 100%;
  transition: 0.25s border ease-in;

  &:focus,
  &:hover {
    border: 2px solid ${(props) => props.theme.colors.grey};
  }
`;

export default inputStyles;
