import CreatableSelect from "react-select/lib/Creatable";
import styled from "./styled-components";
import { inputStyles } from "./inputStyles";

export const StyledCreatableSelect = styled(CreatableSelect)`
  .react-select__control {
    ${inputStyles}
    display: flex;
  }

  .react-select__option {
    font-weight: normal;
    &:hover,
    &--is-focused,
    &--is-selected {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
    }
  }

  .react-select__value-container {
    padding-left: 0;
  }
`;

export default StyledCreatableSelect;
