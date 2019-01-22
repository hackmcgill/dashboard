import styled from 'styled-components';

interface IFooterProps {
  borderThickness: string;
}
const Footer = styled.footer`
  z-index: 10;
  position: fixed;
  right: 0;
  bottom: 0;
  border-top: ${(props: IFooterProps) => props.borderThickness || '1px'} solid
    ${(props) => props.theme.colors.greyLighter};
`;

export default Footer;
