import styled from 'styled-components';

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  border-radius: 4px;
  width: 22px;
  height: 22px;
  background: ${(props) => props.theme.colors.white};
  position: relative;
  vertical-align: middle;
  bottom: 1px;
`;
