import styled from '../Styles/styled-components';

export const SideBarMenuItem = styled.div`
  padding: 1rem 0px;
  display: flex;

  img {
    flex-direction: column;
    height: 2rem;
    width: 2rem;
  }

  h2 {
    padding-left: 35px;
    padding-top: 2px;
    color: #4d4d4d;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #ffff;
    }
  }
`;
