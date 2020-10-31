import styled from '../../shared/Styles/styled-components';

interface INavProps {
  hasBorder: boolean;
}

export const Nav = styled.nav<INavProps>`
  z-index: 10;
  height: 90px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: ${(props) =>
    props.hasBorder ? props.theme.colors.white : 'transparent'};
  border-bottom: 2px solid transparent;
  border-color: ${(props) =>
    props.hasBorder ? props.theme.colors.black5 : 'transparent'};
  transition: 0.25s all ease-in;
`;

export default Nav;
