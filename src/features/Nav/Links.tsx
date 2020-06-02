import styled from '../../shared/Styles/styled-components';

export const Links = styled.div`
  padding: 0.5rem 1.55rem 0 0;
  align-items: center;
  position: fixed;
  top: 1rem;
  right: 0;
  display: none;

  @media only screen and (min-width: ${(props) => props.theme.screens.smUp}) {
    display: flex;
  }
`;

export default Links;
