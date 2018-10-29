import styled from 'styled-components';
const Button = styled.button`
  background-color: red;
  font-size: 14px;
  color: white;
  padding: 10px 5px;
  border: none;
  border-radius: 4px;
  min-width: 80px;
  cursor: pointer;
  transition: 0.15s linear background-color;

  &:hover {
    background-color: coral;
  }
`

export default Button;