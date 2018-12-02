import styled from "styled-components";

interface IFormProps {
  width?: string | number;
}

const Form = styled.form`
  font-family: ${props => props.theme.fontFamily};
  width: ${(props: IFormProps) => (props.width) ? props.width : '100%'};
  height: 100%;
`

export default Form;