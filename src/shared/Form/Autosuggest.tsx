import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import styled from 'styled-components';
import inputStyles from '../Styles/inputStyles';

// Confused? https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14224#issuecomment-428814136
const StringAutosuggester =
  Autosuggest as unknown as new () => Autosuggest<string>;

const AutosuggestWrapper = styled.div`
  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input {
    ${inputStyles};
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
    margin-top: -26px;
    width: 100%;
    align-self: center;
    background: ${(props) => props.theme.colors.white};
    overflow-y: auto;
    max-height: 200px;
    border: 1px solid ${(props) => props.theme.colors.black30};
    font-family: 'Hind Siliguri', sans-serif;
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
    background-color: ${(props) => props.theme.colors.black10};
    color: ${(props) => props.theme.colors.black70};
  }

  .react-autosuggest__suggestion--selected {
    font-weight: normal;
    background-color: ${(props) => props.theme.colors.black10};
    color: ${(props) => props.theme.colors.black70};
  }
`;

export const StyledAutosuggest = (props: any) => (
  <AutosuggestWrapper>
    <StringAutosuggester {...props} />
  </AutosuggestWrapper>
);

export const AutosuggestItem = styled.div``;
