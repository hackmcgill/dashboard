import styled from '../Styles/styled-components';

export const SideBar = styled.nav`
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  transform: 'translateX(-100%)';
  height: 87%;
  width: 18%;
  text-align: left;
  padding: 3rem 0 0 0;
  position: absolute;
  left: 0;

  @media (max-width: 576px) {
    width: 100%;
  }
`;
