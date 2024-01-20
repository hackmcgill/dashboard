import styled from 'styled-components';

interface IFormProps {
  width?: string | number;
}

export const Form = styled.form<IFormProps>`
  width: ${(props) => props.width || '100%'};
`;

export default Form;
