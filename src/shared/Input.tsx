import styled from 'styled-components';

interface IInputProps {
  isTight?: boolean;
  fontWeight?: string;
}

const Input = styled.input<IInputProps>`
  border-radius: 20px;
  border: 2px solid ${props => props.theme.greyLight};
  font-weight: ${props => props.fontWeight ? props.fontWeight : 'normal'}
  box-sizing: border-box;
  display: block;
  font-size: 16px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: ${(props: IInputProps) => (props.isTight) ? '0px' : '20px'};
  min-height: 35px;
  padding-left: 16px;
  width: 80%;

  &:focus,&:hover {
    border: 2px solid ${props => props.theme.grey};
  }
`

export default Input;