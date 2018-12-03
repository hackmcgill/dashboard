
import styled from "styled-components";
import * as Autosuggest from 'react-autosuggest';
import { ITheme } from 'src/theme';
const stringAutosuggester = Autosuggest as { new(): Autosuggest<string> };

interface IStyledAutosuggestProps {
    isTight?: boolean;
    theme: ITheme;
}

export const StyledAutosuggest = styled(stringAutosuggester)`
    border-radius: 20px;
    border: 2px solid ${props => props.theme.greyLight};
    box-sizing: border-box;
    display: block;
    font-size: 16px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: ${(props: IStyledAutosuggestProps) => (props.isTight) ? '0px' : '20px'};
    min-height: 35px;
    padding-left: 16px;
    width: 80%;  
    position: relative;
&.react-autosuggest__input {
    width: 240px;
    height: 30px;
    padding: 10px 20px;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border: 1px solid #aaa;
    border-radius: 4px;
}

&.react-autosuggest__input--focused {
    outline: none;
}

&.react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

&.react-autosuggest__suggestions-container {
    display: none;
}

&.react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 51px;
    width: 280px;
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    max-height: 100px;
    overflow-y: auto;
    z-index: 2;
}

&.react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

&.react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
}

&.react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
}
`;


export const AutosuggestItem = styled.div``;