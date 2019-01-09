import styled from '../Styles/styled-components';

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  border-radius: 4px;
  width: 24px;
  height: 24px;
  background: ${(props) => props.theme.colors.white};
  position: relative;
  vertical-align: middle;
  bottom: 1px;
`;
