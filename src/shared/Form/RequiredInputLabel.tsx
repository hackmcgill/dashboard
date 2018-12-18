import styled from '../Styles/styled-components';

export const RequiredInputLabel = styled.span`
  color: ${(props) => props.theme.colors.primary};
  display: inline-block;
  font-weight: lighter;
  margin-left: 5px;
`;
export default RequiredInputLabel;
