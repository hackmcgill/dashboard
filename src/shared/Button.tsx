import styled from "src/shared/styled-components";

interface IButtonProps {
  secondary?: boolean;
}

const Button = styled.button<IButtonProps>`
  background-color: ${props => props.secondary ? props.theme.colors.grey : props.theme.colors.primary};
  font-size: 14px;
  font-family: ${props => props.theme.fonts.header};
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
    background-color: ${props => props.secondary ? props.theme.colors.primary : props.theme.colors.primaryLight};
  }
`;

export default Button;
