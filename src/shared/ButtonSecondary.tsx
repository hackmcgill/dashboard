import styled from 'styled-components';

const ButtonSecondary = styled.button`
  background-color: ${props => props.theme.secondary};
  font-size: 14px;
  font-family: props.theme.headerFont;
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
    background-color: ${props => props.theme.primary};
  }
`;

export default ButtonSecondary;
