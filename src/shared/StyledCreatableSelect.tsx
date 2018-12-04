import CreatableSelect from "react-select/lib/Creatable";
import styled from "styled-components";
import inputStyles from "src/shared/inputStyles";

const StyledCreatableSelect = styled(CreatableSelect)`
  .react-select__control {
    ${inputStyles}
    display: flex;
  }

  .react-select__option {
    font-weight: normal;
    &: hover {
      background-color: ${props => props.theme.primaryLight};
    }

    &--is-focused {
      background-color: ${props => props.theme.primaryLight};
    }

    &--is-selected {
      background-color: ${props => props.theme.primary};
    }
  }
`;

export default StyledCreatableSelect;
