import styled from "src/shared/styled-components";
import { ITheme } from "src/theme";

export interface IButtonProps {
  secondary?: boolean;
  theme?: ITheme;
}

const Button = styled.button`
  background-color: ${(props: IButtonProps) =>
    props.theme &&
    (props.secondary ? props.theme.colors.grey : props.theme.colors.primary)};
  font-size: 14px;
  font-family: ${(props: IButtonProps) =>
    props.theme && props.theme.fonts.header};
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
      props.theme &&
      (props.secondary
        ? props.theme.colors.primary
        : props.theme.colors.primaryLight)};
  }
`;

export default Button;
