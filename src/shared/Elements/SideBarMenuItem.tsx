import styled from '../Styles/styled-components';

interface ISideBarMenuItemProps {
  currentPage: boolean;
}

export const SideBarMenuItem = styled.div<ISideBarMenuItemProps>`
  padding: 1.5rem 0 1rem 2rem;
  display: flex;
  background-color: ${(props) => (props.currentPage ? '#F2463A' : '')};

  img {
    flex-direction: column;
    height: 2rem;
    width: 2rem;
  }

  h2 {
    padding-left: 35px;
    padding-top: 2px;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }
  }
`;
