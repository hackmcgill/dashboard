import styled from 'styled-components';

export const Links = styled.div`
  padding: 0 40px 0 0;
  align-items: center;
  position: fixed;
  top: 25px;
  right: 0;
  display: none;

  @media only screen and (min-width: ${(props) => props.theme.screens.smUp}) {
    display: flex;
  }
`;

export default Links;
