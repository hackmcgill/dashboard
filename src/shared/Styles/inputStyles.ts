import { css } from './styled-components';

export interface IInputProps {
  isTight?: boolean;
  fontWeight?: string;
}

export const inputStyles = css<IInputProps>`
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.colors.black10};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  box-sizing: border-box;
  display: block;
  font-size: 16px;
  margin: auto;
  margin-top: 16px;
  margin-bottom: ${(props) => (props.isTight ? '8px' : '20px')};
  min-height: 40px;
  padding-left: 18px;
  width: 100%;
  transition: 0.25s border ease-in;
  color: ${(props) => props.theme.colors.black80};

  &::placeholder {
    color: ${(props) => props.theme.colors.black40};
  }

  &:focus,
  &:hover {
    border: 2px solid ${(props) => props.theme.colors.black60};
  }

  &:disabled {
    border-color: ${(props) => props.theme.colors.black10} !important;
    background-color: ${(props) => props.theme.colors.black5} !important;
    cursor: not-allowed;
  }
`;

export default inputStyles;
