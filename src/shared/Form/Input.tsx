import styled from 'styled-components';
import { inputStyles } from '../Styles/inputStyles';
import { IInputProps } from '../Styles/inputStyles';

const inputBase = styled.input``;

export const Input = styled(inputBase)<IInputProps>`
  ${inputStyles}
`;

export default Input;
