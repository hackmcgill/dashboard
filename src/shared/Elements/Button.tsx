import styled from '../Styles/styled-components';

export interface IButtonProps {
  secondary?: boolean;
  isLoading?: boolean;
  isNarrow?: boolean;
  disabled?: boolean;
}

export const Button = styled.button<IButtonProps>`
  background-color: ${(props) =>
    props.secondary ? props.theme.colors.black60 : props.theme.colors.red};
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.header};
  color: white;
  padding: 10px 16px;
  margin: 6px;
  border: none;
  border-radius: 3.75em;
  min-width: ${(props) => (!props.isNarrow ? '100px' : 'initial')};
  cursor: pointer;
  transition: 0.15s linear all;
  font-weight: bold;
  position: relative;

  ${(props) =>
    props.disabled
      ? `
        cursor: not-allowed;
        color: ${props.theme.colors.black30};
        background-color: ${props.theme.colors.black30};
      `
      : `&:hover {
          background-color: ${
            props.secondary
              ? props.theme.colors.red
              : props.theme.colors.redLight
          };
        }
    `}

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  ${(props) =>
    props.isLoading &&
    `
    color: ${
      props.secondary ? props.theme.colors.black60 : props.theme.colors.red
    };
    &:hover {
      color: ${
        props.secondary ? props.theme.colors.red : props.theme.colors.redLight
      };
    }
    &:before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin-top: -10px;
      margin-left: -10px;
      border-radius: 50%;
      border: 3px solid ${
        props.secondary
          ? props.theme.colors.black30
          : props.theme.colors.redLight
      };
      border-top-color: ${props.theme.colors.white};
      animation: spinner .8s ease infinite;
    }`}
`;

export default Button;
