import styled from '../../shared/Styles/styled-components';

// interface INavOnboardingProps {
//     scrollY: number;
// }

// padding-top: ${(props) => props.scrollY < 90 ? '90px' : '0px' };

export const Nav = styled.nav`
  z-index: 5;
  height: 40px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid transparent;
  transition: 0.25s border-color ease-in;
`;

export default Nav;