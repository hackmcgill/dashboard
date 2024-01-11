import styled from 'styled-components';

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  @media only screen and (min-width: ${(props) => props.theme.screens.smUp}) {
    width: 50%;
  }
`;

export default NavContainer;
