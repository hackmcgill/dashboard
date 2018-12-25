import styled from '../Styles/styled-components';

interface IButtonProps {
  secondary?: boolean;
  isLoading?: boolean;
}

export const Button = styled.button<IButtonProps>`
  background-color: ${(props) =>
    props.secondary ? props.theme.colors.grey : props.theme.colors.primary};
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.header};
  color: white;
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  min-width: 100px;
  cursor: pointer;
  transition: 0.15s linear all;
  font-weight: bold;
  position: relative;

  &:hover {
    background-color: ${(props) =>
      props.secondary
        ? props.theme.colors.primary
        : props.theme.colors.primaryLight};
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  ${(props) =>
    props.isLoading &&
    `
    color: ${
      props.secondary ? props.theme.colors.grey : props.theme.colors.primary
    };
    &:hover {
      color: ${
        props.secondary
          ? props.theme.colors.primary
          : props.theme.colors.primaryLight
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
          ? props.theme.colors.greyLight
          : props.theme.colors.primaryLight
      };
      border-top-color: ${props.theme.colors.white};
      animation: spinner .8s ease infinite;
    }`}
`;

export default Button;
