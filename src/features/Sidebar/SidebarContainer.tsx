import styled from '../../shared/Styles/styled-components';

export const SidebarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  background: #ededed;
  box-shadow: 3px 0px 5px 6px #e8e8e8;
  transform: 'translateX(-100%)';
  height: 100%;
  width: 18%;
  text-align: left;
  padding: 0 0 0 0;
  position: absolute;
  left: 0;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export default SidebarContainer;
