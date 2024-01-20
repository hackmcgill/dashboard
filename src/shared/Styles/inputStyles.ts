import { css } from 'styled-components';

export interface IInputProps {
  isTight?: boolean;
  fontWeight?: string;
}

export const inputStyles = css<IInputProps>`
  border-radius: 8px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  border: none;
  box-shadow: 2px 4px 16px 0px ${(props) => props.theme.colors.greyLight};
  box-sizing: border-box;
  display: block;
  font-size: 16px;
  margin: auto;
  margin-top: 12px;
  margin-bottom: ${(props) => (props.isTight ? '24px' : '32px')};
  min-height: 40px;
  padding-left: 18px;
  width: 100%;
  transition: 0.25s border ease-in, 0.25s box-shadow ease-in;
  color: ${(props) => props.theme.colors.black80};
  font-family: ${(props) => props.theme.fonts.header};

  &::placeholder {
    color: ${(props) => props.theme.colors.black40};
  }

  &:focus {
    outline: none;
    box-shadow: 2px 2px 16px 2px ${(props) => props.theme.colors.blueLight};
  }

  &:disabled {
    border-color: ${(props) => props.theme.colors.black5} !important;
    background-color: ${(props) => props.theme.colors.black5} !important;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export default inputStyles;
