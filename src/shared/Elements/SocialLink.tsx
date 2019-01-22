import styled from 'styled-components';

const SocialLink = styled.a`
  color: ${(props) => props.theme.colors.greyDark};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;
export default SocialLink;
