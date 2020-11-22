import styled from '../../Styles/styled-components';
import theme from '../../Styles/theme';

const FormikError = styled.div`
  color: ${theme.colors.red};
  font-size: 16px;
  margin-top: -26px;
  margin-bottom: 24px;
  text-align: left;
`;

export { FormikError as Error };
