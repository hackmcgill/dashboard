import styled from 'styled-components';

export const Nav = styled.nav`
  z-index: 5;
  height: 40px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid transparent;
  transition: 0.25s border-color ease-in;
`;

export default Nav;
