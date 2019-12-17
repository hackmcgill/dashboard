import styled from '../Styles/styled-components';
import theme from '../../shared/Styles/theme';

interface IFormProps {
  width?: string | number;
}

export const Form = styled.form<IFormProps>`
  width: ${(props) => props.width || '100%'};
  font-family: ${theme.fonts.header}, sans-serif;
`;

export default Form;
