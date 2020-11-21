import styled from '../../Styles/styled-components';
import theme from '../../Styles/theme';

const FormikError = styled.div`
  color: ${theme.colors.red};
  font-size: 14px;
  margin-top: -26px;
  margin-bottom: 16px;
  text-align: left;
`;

export { FormikError as Error };
