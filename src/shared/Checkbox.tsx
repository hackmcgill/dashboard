import styled from 'styled-components';
import { ITheme } from 'src/theme';

interface ICheckboxProps {
    theme?: ITheme;
}

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    border-radius: 4px;
    width: 24px;
    height: 24px;
    background: ${(props: ICheckboxProps) => props.theme ? props.theme.colors.white : 'white'};
    position: relative;
    vertical-align: middle;
    bottom: 1px;
`
export default Checkbox; 
