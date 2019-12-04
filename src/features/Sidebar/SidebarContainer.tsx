import styled from '../../shared/Styles/styled-components';
import theme from '../../shared/Styles/theme';

export const SidebarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.black5};
  box-shadow: 3px 0px 5px 3px ${theme.colors.black40};
  transform: 'translateX(-100%)';
  height: 100%;
  width: 18%;
  text-align: left;
  padding: 0 0 0 0;
  position: fixed;
  left: 0;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export default SidebarContainer;