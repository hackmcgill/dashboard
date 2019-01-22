import styled from 'styled-components';

interface IFooterProps {
  borderThickness: string;
}
const Footer = styled.footer<IFooterProps>`
  z-index: 11;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: ${(props) => props.borderThickness || '1px'} solid
    ${(props) => props.theme.colors.greyLighter};
`;

export default Footer;
