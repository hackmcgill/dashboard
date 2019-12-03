import styled from '../../shared/Styles/styled-components';

export interface ISidebarItemProps {
  currentPage: boolean;
  title: string;
  hidden: boolean;
}

export const SidebarItem = styled.div<ISidebarItemProps>`
  padding: 1.5rem 0 1rem 2rem;
  display: flex;
  visibility: ${(props) => (props.hidden ? 'hidden' : '')};
  background-color: ${(props) => (props.currentPage ? '#F2463A' : '#ffffff')};
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

export default SidebarItem;
