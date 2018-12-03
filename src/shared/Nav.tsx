
import styled from "styled-components";

export const Nav = styled.nav<{ borderThickness?: string }>`
    z-index: 100000;
    background: #ffffff;
    position: fixed;
    top: 0;
    width: 100%;
    font-family: ${props => props.theme.fontFamily};
    border-bottom: ${props => props.borderThickness ? props.borderThickness : '1px'} solid ${props => props.theme.greySuperLight};
`;