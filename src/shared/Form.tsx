import styled from "src/shared/styled-components";

interface IFormProps {
  width?: string | number;
}

const Form = styled.form`
  width: ${(props: IFormProps) => props.width || "100%"};
`;

export default Form;
