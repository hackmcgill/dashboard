import styled from '../../shared/Styles/styled-components';

export const SidebarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  transform: 'translateX(-100%)';
  height: 100%;
  width: 18%;
  text-align: left;
  padding: 3rem 0 0 0;
  position: absolute;
  left: 0;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export default SidebarContainer;
