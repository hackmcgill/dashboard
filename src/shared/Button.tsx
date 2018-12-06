import styled from 'styled-components';
import { ITheme } from 'src/theme';

export interface IButtonProps {
  secondary?: boolean
  theme: ITheme
}

const Button = styled.button<{ secondary?: boolean }>`
  background-color: ${(props:IButtonProps) => props.secondary ? props.theme.secondary : props.theme.primary};
  font-size: 14px;
  font-family: Brown, Hind Siliguri, -apple-system, system-ui, BlinkMacSystemFont, sans-serif;
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
    background-color:  ${(props:IButtonProps) => props.secondary ? props.theme.primary : props.theme.primaryLight};
  }
`;

export default Button;
