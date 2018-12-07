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
      background-color: ${props => props.theme.colors.primaryLight};
    }

    &--is-focused {
      background-color: ${props => props.theme.colors.primaryLight};
    }

    &--is-selected {
      background-color: ${props => props.theme.colors.primary};
    }
  }
`;

export default StyledCreatableSelect;
