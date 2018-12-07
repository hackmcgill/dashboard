
import styled from "styled-components";
import { ITheme } from 'src/theme';

interface INavProps {
    borderThickness: string;
    theme: ITheme;
}

export const Nav = styled.nav<{ borderThickness?: string }>`
    z-index: 11;
    background: ${(props: INavProps) => props.theme.colors.white};
    position: sticky;
    top: 0;
    width: 100%;
    border-bottom: ${(props:INavProps) => props.borderThickness || '1px'} solid ${(props:INavProps) => props.theme.colors.greyLighter};
`;
