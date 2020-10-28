import styled from '../../shared/Styles/styled-components';

interface INavProps {
  hasBorder: boolean;
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
  border-bottom: ${(props) => (props.hasBorder ? '2px solid' : '0px')}
    ${(props) => props.theme.colors.black5};
  transition: ${(props) =>
    props.hasBorder ? '0.25s border ease-in' : 'all 0s ease 0s'};
`;

export default Nav;
