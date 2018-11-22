
import styled from "styled-components";
import * as Autosuggest from 'react-autosuggest';
const stringAutosuggester = Autosuggest as { new(): Autosuggest<string> };

export const StyledAutosuggest = styled(stringAutosuggester)``;

export const AutosuggestItem = styled.div``;