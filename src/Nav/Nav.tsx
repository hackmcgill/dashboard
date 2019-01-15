import styled from '../shared/Styles/styled-components';

interface INavProps {
  borderThickness: string;
}

export const Nav = styled.nav<INavProps>`
  z-index: 11;
  background: ${(props) => props.theme.colors.white};
  position: sticky;
  top: 0;
  width: 100%;
  border-bottom: ${(props) => props.borderThickness || '1px'} solid
    ${(props) => props.theme.colors.greyLighter};
`;

export default Nav;
