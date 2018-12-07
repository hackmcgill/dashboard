import styled from "styled-components";
import { ITheme } from "src/theme";

export interface IButtonProps {
  secondary?: boolean;
  theme: ITheme;
}

const Button = styled.button<{ secondary?: boolean }>`
  background-color: ${(props: IButtonProps) =>
    props.secondary ? props.theme.colors.grey : props.theme.colors.primary};
  font-size: 14px;
  font-family: ${props => props.theme.headerFont};
  color: white;
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  min-width: 100px;
  cursor: pointer;
  transition: 0.15s linear background-color;
  font-weight: bold;

  &:hover {
    background-color: ${(props: IButtonProps) =>
      props.secondary
        ? props.theme.colors.primary
        : props.theme.colors.primaryLight};
  }
`;

export default Button;
