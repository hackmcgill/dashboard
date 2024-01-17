import styled from 'styled-components';

export const NavLink = styled.a`
  font-family: 'Brown';
  cursor: pointer;
  color: ${(props) => props.theme.colors.black60};
  text-decoration: none;
  font-size: 0.8rem;

  &:focus,
  &:hover,
  &:active {
    color: ${(props) => props.theme.colors.red};
    background: transparent;
  }

  @media only screen and (min-width: ${(props) => props.theme.screens.smUp}) {
    margin-right: 2rem;
    margin-top: 1px;
    font-size: 1rem;
  }

  &.active {
    border-bottom: 2px solid ${(props) => props.theme.colors.red};
    color: ${(props) => props.theme.colors.red};
  }
`;

export default NavLink;
