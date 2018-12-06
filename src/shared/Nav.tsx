
import styled from "styled-components";

export const Nav = styled.nav<{ borderThickness?: string }>`
    z-index: 11;
    background: #ffffff;
    position: sticky;
    top: 0;
    width: 100%;
    border-bottom: ${props => props.borderThickness ? props.borderThickness : '1px'} solid ${props => props.theme.greySuperLight};
`;
