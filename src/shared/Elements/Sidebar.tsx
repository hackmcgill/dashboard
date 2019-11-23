import styled from '../Styles/styled-components';

export const SideBar = styled.nav`
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  transform: 'translateX(-100%)';
  height: 87%;
  width: 18%;
  text-align: left;
  padding: 1rem 0 0 2rem;
  position: absolute;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }
`;
