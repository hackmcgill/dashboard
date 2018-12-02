import styled from 'styled-components';
const Button = styled.button`
background-color: ${props => props.theme.primary};
  font-size: 14px;
  color: white;
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  min-width: 100px;
  cursor: pointer;
  transition: 0.15s linear background-color;

  &:hover {
    background-color: ${props => props.theme.primaryLight};
  }
`;

export default Button;
