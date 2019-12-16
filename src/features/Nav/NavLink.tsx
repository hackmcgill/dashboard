import styled from '../../shared/Styles/styled-components';

export const NavLink = styled.a`
  margin-right: 2rem;
  margin-top: 1px;
  font-family: 'Brown';
  cursor: pointer;
  color: ${(props) => props.theme.colors.black60};
  text-decoration: none;

  &:focus,
  &:hover,
  &:active {
    color: ${(props) => props.theme.colors.red};
    background: transparent;
  }
`;

export default NavLink;
