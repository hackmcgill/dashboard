import * as React from 'react';
import styled from "styled-components";
import * as Autosuggest from 'react-autosuggest';
import inputStyles from 'src/shared/inputStyles';

const StringAutosuggester = Autosuggest as { new(): Autosuggest<string> };

const AutosuggestWrapper = styled.div`
  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input {
    ${inputStyles};
    font-family: Hind Siliguri, -apple-system, system-ui, BlinkMacSystemFont, sans-serif;
  }

  .react-autosuggest__input:hover {
    border: 2px solid #4D4D4D;
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    padding-top: 5px;
    padding-bottom: 5px;
    position: absolute;
    width: 100%;
    align-self: center;
    background: #ffffff;
    overflow-y: auto;
    max-height: 200px;
    border: 1px solid #dadada;
    border-radius: 2px;
    z-index: 10;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    font-weight: normal;
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    font-weight: normal;
    background-color: #F89790;
  }

  .react-autosuggest__suggestion--selected {
    font-weight: normal;
    background-color: #F2463A;
  }
`;

export const StyledAutosuggest = (props: any) => (
  <AutosuggestWrapper>
    <StringAutosuggester {...props}/>
  </AutosuggestWrapper>
)

export const AutosuggestItem = styled.div``;
