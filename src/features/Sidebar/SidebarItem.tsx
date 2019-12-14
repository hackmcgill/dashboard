import styled from '../../shared/Styles/styled-components';
import theme from '../../shared/Styles/theme';

export interface ISidebarItemProps {
  currentPage: boolean;
  title: string;
  hidden: boolean;
}

export const SidebarItem = styled.div<ISidebarItemProps>`
  padding: 1.5rem 0 1rem 1rem;
  display: flex;
  overflow: scroll;
  position: relative;
  visibility: ${(props) => (props.hidden ? 'hidden' : '')};
  background-color: ${(props) =>
    props.currentPage ? theme.colors.red : theme.colors.black5};
  :hover {
    background-color: ${(props) =>
      props.currentPage ? theme.colors.red : theme.colors.yellow};
  }
  img {
    flex-direction: column;
    height: 2rem;
    width: 2rem;
  }

  h2 {
    padding-left: 35px;
    padding-top: 2px;
    transition: color 0.3s linear;
    text-decoration-line: none;

    @media (max-width: 18%) {
      font-size: 1.5rem;
      text-align: center;
    }
  }
`;

export default SidebarItem;
