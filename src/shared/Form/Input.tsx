import { inputStyles } from '../Styles/inputStyles';
import { IInputProps } from '../Styles/inputStyles';
import styled from '../Styles/styled-components';

const inputBase = styled.input``;

export const Input = styled(inputBase)<IInputProps>`
  ${inputStyles}
`;

export default Input;
