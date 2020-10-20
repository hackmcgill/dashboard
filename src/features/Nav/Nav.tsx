import styled from '../../shared/Styles/styled-components';

interface INavProps {
  borderThickness?: string;
}

export const Nav = styled.nav<INavProps>`
  z-index: 10;
  height: 4.25rem;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.white};
`;

export default Nav;
